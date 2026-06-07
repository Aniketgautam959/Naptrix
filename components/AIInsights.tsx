'use client';

import { useState, useEffect } from 'react';
import { getAIInsights } from '@/app/actions/getAIInsights';
import { Card, CardHeader } from '@/components/ui/Card';

export default function AIInsights() {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cached, setCached] = useState(false);

  const fetchInsights = async (force = false) => {
    setLoading(true);
    setError('');
    try {
      const result = await getAIInsights(force);
      if (result.error) setError(result.error);
      else {
        setInsights(result.insights || '');
        setCached(result.cached ?? false);
      }
    } catch {
      setError('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const renderLine = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className='font-medium text-slate-800 dark:text-slate-200'>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const lines = insights
    .split('\n')
    .filter((l) => l.trim())
    .map((line) => ({
      num: line.match(/^\d+\./)?.[0] || '•',
      text: line.replace(/^\d+\.\s*/, ''),
    }));

  return (
    <Card padding='lg'>
      <CardHeader
        title='AI Insights'
        subtitle={cached ? 'Cached · refreshes every 24h' : 'Personalized sleep tips'}
        action={
          <button
            onClick={() => fetchInsights(true)}
            disabled={loading}
            className='text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-40'
          >
            {loading ? '...' : 'Refresh'}
          </button>
        }
      />

      {loading && (
        <p className='text-xs text-slate-400 animate-pulse py-4 text-center'>Analyzing patterns...</p>
      )}

      {error && !loading && (
        <p className='text-xs text-red-500 dark:text-red-400 py-2'>{error}</p>
      )}

      {lines.length > 0 && !loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-h-36 overflow-y-auto custom-scrollbar pr-1'>
          {lines.map((line, index) => (
            <div key={index} className='flex gap-2'>
              <span className='text-blue-600 dark:text-blue-400 font-semibold text-[10px] mt-1 shrink-0 w-4'>
                {line.num}
              </span>
              <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed'>
                {renderLine(line.text)}
              </p>
            </div>
          ))}
        </div>
      )}

      {!insights && !loading && !error && (
        <p className='text-xs text-slate-400 py-4 text-center'>
          Add sleep records to get AI recommendations
        </p>
      )}
    </Card>
  );
}
