'use server';

import getRecords from '@/app/actions/getRecords';
import { checkUser } from '@/lib/checkUser';
import {
  calculateGoalProgress,
  calculateSleepDebt,
  calculateStreak,
} from '@/lib/sleepStats';

type SleepStatsResult =
  | {
      goal: number;
      streak: number;
      progress: { met: number; total: number; percentage: number };
      sleepDebt: number;
      totalRecords: number;
    }
  | { error: string };

export async function getSleepStats(): Promise<SleepStatsResult> {
  const user = await checkUser();
  if (!user) return { error: 'User not found' };

  const { records = [], error } = await getRecords();
  if (error) return { error };

  const goal = user.sleepGoal ?? 8;

  return {
    goal,
    streak: calculateStreak(records, goal),
    progress: calculateGoalProgress(records, goal),
    sleepDebt: calculateSleepDebt(records, goal),
    totalRecords: records.length,
  };
}
