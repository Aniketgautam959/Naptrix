'use client';

import { useState, useTransition } from 'react';
import { updateSleepGoal } from '@/app/actions/updateSleepGoal';
import { Card } from '@/components/ui/Card';

interface SleepGoalStreakProps {
  goal: number;
  streak: number;
  progress: { met: number; total: number; percentage: number };
  sleepDebt: number;
}

export default function SleepGoalStreak({
  goal,
  streak,
  progress,
  sleepDebt,
}: SleepGoalStreakProps) {
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [isPending, startTransition] = useTransition();

  const handleGoalChange = (value: number) => {
    setCurrentGoal(value);
    startTransition(async () => {
      await updateSleepGoal(value);
    });
  };

  return (
    <Card>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
          Sleep Goal
        </p>
        {streak > 0 && (
          <span className='text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full'>
            {streak}d streak
          </span>
        )}
      </div>

      <div className='flex items-baseline gap-1 mb-3'>
        <span className='text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums'>
          {currentGoal}
        </span>
        <span className='text-xs text-slate-400'>h / night</span>
      </div>

      <input
        type='range'
        min={5}
        max={10}
        step={0.5}
        value={currentGoal}
        onChange={(e) => handleGoalChange(parseFloat(e.target.value))}
        disabled={isPending}
        className='w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer slider mb-3'
        aria-label='Sleep goal hours'
      />

      <div className='flex gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs'>
        <div>
          <span className='font-semibold text-slate-900 dark:text-slate-100'>{progress.percentage}%</span>
          <span className='text-slate-400 ml-1'>goal met</span>
        </div>
        <div>
          <span className='font-semibold text-slate-900 dark:text-slate-100'>{sleepDebt}h</span>
          <span className='text-slate-400 ml-1'>debt</span>
        </div>
      </div>
    </Card>
  );
}
