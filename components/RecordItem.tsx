'use client';

import { useState } from 'react';
import { Record } from '@/types/Record';
import deleteRecord from '@/app/actions/deleteRecord';

const RecordItem = ({ record }: { record: Record }) => {
  const [isLoading, setIsLoading] = useState(false);

  const hours = record.amount;
  const quality =
    hours >= 8
      ? 'Excellent'
      : hours >= 7
        ? 'Good'
        : hours >= 6
          ? 'Fair'
          : 'Poor';

  const qualityColor =
    hours >= 8
      ? 'text-emerald-600 dark:text-emerald-400'
      : hours >= 7
        ? 'text-blue-600 dark:text-blue-400'
        : hours >= 6
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-red-500 dark:text-red-400';

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="text-right w-14 shrink-0">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
            {hours}h
          </p>
          <p className={`text-[10px] font-medium ${qualityColor}`}>{quality}</p>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {new Date(record.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          {record.text && (
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
              {record.text}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setIsLoading(true);
          deleteRecord(record.id).finally(() => setIsLoading(false));
        }}
        disabled={isLoading}
        aria-label="Delete record"
        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all disabled:opacity-30"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default RecordItem;
