'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import getRecords from './getRecords';

const CACHE_HOURS = 24;
const MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-2.5-flash',
  'gemini-2.0-flash',
].filter(Boolean) as string[];

async function generateWithFallback(apiKey: string, prompt: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: unknown;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      lastError = error;
      console.error(`Gemini model "${modelName}" failed:`, error);
    }
  }

  throw lastError;
}

export async function getAIInsights(force = false): Promise<{
  insights?: string;
  error?: string;
  cached?: boolean;
}> {
  try {
    const user = await checkUser();
    if (!user) return { error: 'User not found' };

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return { error: 'AI insights unavailable. Add GEMINI_API_KEY to .env.local' };
    }

    const { records, error } = await getRecords();
    if (error || !records || records.length === 0) {
      return { error: 'No sleep records found' };
    }

    if (
      !force &&
      user.cachedInsights &&
      user.insightsUpdatedAt &&
      Date.now() - user.insightsUpdatedAt.getTime() < CACHE_HOURS * 60 * 60 * 1000
    ) {
      return { insights: user.cachedInsights, cached: true };
    }

    const sleepData = records.map((record) => ({
      date: record.date,
      hours: record.amount,
      quality: record.text || 'No notes',
    }));

    const totalHours = sleepData.reduce((sum, r) => sum + r.hours, 0);
    const averageHours = totalHours / sleepData.length;
    const minHours = Math.min(...sleepData.map((r) => r.hours));
    const maxHours = Math.max(...sleepData.map((r) => r.hours));

    const prompt = `Analyze this sleep data and give exactly 4-5 brief, actionable recommendations (1-2 sentences each). Numbered list only, no intro.

Sleep Records (${sleepData.length} entries):
${sleepData.map((r) => `${new Date(r.date).toLocaleDateString()}: ${r.hours}h, felt ${r.quality}`).join('\n')}

Stats: avg ${averageHours.toFixed(1)}h, range ${minHours}-${maxHours}h`;

    const insights = await generateWithFallback(apiKey, prompt);

    try {
      await db.user.update({
        where: { clerkUserId: user.clerkUserId },
        data: { cachedInsights: insights, insightsUpdatedAt: new Date() },
      });
    } catch (cacheError) {
      // Insights generated fine — don't fail if cache save has a DB issue
      console.error('Failed to cache AI insights:', cacheError);
    }

    return { insights, cached: false };
  } catch (error) {
    console.error('Error generating AI insights:', error);

    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('API_KEY_INVALID') || message.includes('API key')) {
      return { error: 'Invalid Gemini API key. Update GEMINI_API_KEY in .env.local and restart the server.' };
    }

    if (message.includes('429') || message.includes('quota')) {
      return { error: 'Gemini API quota exceeded. Wait a minute and try Refresh again.' };
    }

    return { error: 'Failed to generate insights. Try Refresh again.' };
  }
}
