import getRecords from '@/app/actions/getRecords';
import BarChart from './BarChart';

const RecordChart = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='bg-white border border-slate-100 rounded-xl p-6'>
        <p className='text-sm text-red-500'>Error loading records: {error}</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className='bg-white border border-slate-100 rounded-xl p-8'>
        <div className='py-12 text-center'>
          <p className='text-sm font-medium text-slate-400'>No sleep records yet</p>
          <p className='text-sm text-slate-400 mt-1'>Add your first record to see the chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white border border-slate-100 rounded-xl p-6'>
      <div className='flex items-start justify-between mb-6'>
        <div>
          <h3 className='text-base font-semibold text-slate-900'>Sleep Records</h3>
          <p className='text-sm text-slate-400 mt-0.5'>Hours slept per night</p>
        </div>
        <div className='flex items-center gap-4 text-xs text-slate-400'>
          {[
            { label: 'Poor', opacity: 'opacity-20' },
            { label: 'Fair', opacity: 'opacity-40' },
            { label: 'Good', opacity: 'opacity-70' },
            { label: 'Excellent', opacity: 'opacity-100' },
          ].map((item) => (
            <div key={item.label} className='flex items-center gap-1.5'>
              <div className={`w-2.5 h-2.5 rounded-sm bg-slate-900 ${item.opacity}`}></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='h-72'>
        <BarChart records={records} />
      </div>
    </div>
  );
};

export default RecordChart;