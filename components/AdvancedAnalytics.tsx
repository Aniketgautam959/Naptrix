'use client';
import { useState } from 'react';
import { Record } from '@/types/Record';
import SleepTrendAnalysis from './SleepTrendAnalysis';
import SleepReports from './SleepReports';
import DataExport from './DataExport';

const AdvancedAnalytics = ({ records = [] }: { records?: Record[] }) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'reports' | 'export'>('trends');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Advanced Analytics</h2>
        <p className="text-slate-600">Deep insights into your sleep patterns and trends</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-slate-100 rounded-2xl p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'trends'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
              <span>Trends</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'reports'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              <span>Reports</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'export'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              <span>Export</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'trends' && <SleepTrendAnalysis records={records} />}
        {activeTab === 'reports' && <SleepReports records={records} />}
        {activeTab === 'export' && <DataExport records={records} />}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
