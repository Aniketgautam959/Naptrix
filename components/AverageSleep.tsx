import React from 'react';
import getUserRecord from '@/app/actions/getUserRecord';

const AverageSleep = async () => {
  try {
    const { record, daysWithRecords } = await getUserRecord();

    const validRecord = record || 0;
    const validDays = daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageSleep = validRecord / validDays;
    const hours = Math.floor(averageSleep);
    const minutes = Math.round((averageSleep - hours) * 60);

    return (
      <div className='bg-white border border-slate-100 rounded-xl p-6 h-full flex flex-col justify-between'>
        <div>
          <p className='text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4'>Avg. Duration</p>
          <p className='text-5xl font-bold text-slate-900 tabular-nums leading-none'>
            {hours}
            <span className='text-2xl font-medium text-slate-400'>h </span>
            {minutes}
            <span className='text-2xl font-medium text-slate-400'>m</span>
          </p>
        </div>
        <p className='text-sm text-slate-400 mt-6'>
          Based on {validDays} night{validDays !== 1 ? 's' : ''} of data
        </p>
      </div>
    );
  } catch {
    return (
      <div className='bg-white border border-slate-100 rounded-xl p-6 h-full flex flex-col justify-between'>
        <div>
          <p className='text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4'>Avg. Duration</p>
          <p className='text-5xl font-bold text-slate-300 tabular-nums leading-none'>--</p>
        </div>
        <p className='text-sm text-slate-400 mt-6'>Unable to calculate</p>
      </div>
    );
  }
};

export default AverageSleep;