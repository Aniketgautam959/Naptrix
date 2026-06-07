'use client';

import { useState } from 'react';
import { Record } from '@/types/Record';
import SleepTrendAnalysis from './SleepTrendAnalysis';
import SleepReports from './SleepReports';
import DataExport from './DataExport';

const tabs = [
  { id: 'trends' as const, label: 'Trends' },
  { id: 'reports' as const, label: 'Reports' },
  { id: 'export' as const, label: 'Export' },
];

const AdvancedAnalytics = ({ records = [] }: { records?: Record[] }) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'reports' | 'export'>(
    'trends'
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Analytics
        </h2>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'trends' && <SleepTrendAnalysis records={records} />}
      {activeTab === 'reports' && <SleepReports records={records} />}
      {activeTab === 'export' && <DataExport records={records} />}
    </div>
  );
};

export default AdvancedAnalytics;
