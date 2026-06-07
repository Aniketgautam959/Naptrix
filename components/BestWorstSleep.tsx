import getBestWorstSleep from '@/app/actions/getBestWorstSleep';
import { Card } from '@/components/ui/Card';

const BestWorstSleep = async () => {
  const { bestSleep, worstSleep } = await getBestWorstSleep();

  return (
    <Card>
      <p className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3'>
        Best / Worst
      </p>
      <div className='flex items-center gap-5'>
        <div>
          <p className='text-[10px] text-slate-400 uppercase mb-0.5'>Best</p>
          <p className='text-3xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums'>
            {bestSleep !== undefined ? (
              <>{bestSleep}<span className='text-sm font-medium text-slate-400'>h</span></>
            ) : (
              <span className='text-slate-300'>--</span>
            )}
          </p>
        </div>
        <div className='w-px h-10 bg-slate-100 dark:bg-slate-800' />
        <div>
          <p className='text-[10px] text-slate-400 uppercase mb-0.5'>Worst</p>
          <p className='text-3xl font-bold text-red-500 dark:text-red-400 tabular-nums'>
            {worstSleep !== undefined ? (
              <>{worstSleep}<span className='text-sm font-medium text-slate-400'>h</span></>
            ) : (
              <span className='text-slate-300'>--</span>
            )}
          </p>
        </div>
      </div>
      <p className='text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800'>
        All time
      </p>
    </Card>
  );
};

export default BestWorstSleep;
