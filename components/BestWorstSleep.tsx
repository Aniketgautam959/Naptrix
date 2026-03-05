import getBestWorstSleep from '@/app/actions/getBestWorstSleep';

const BestWorstSleep = async () => {
  const { bestSleep, worstSleep } = await getBestWorstSleep();

  return (
    <div className='bg-white border border-slate-100 rounded-xl p-6 h-full flex flex-col justify-between'>
      <p className='text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6'>Best / Worst</p>

      <div className='flex flex-col gap-6'>
        <div>
          <p className='text-xs text-slate-400 mb-1'>Best Night</p>
          <p className='text-4xl font-bold text-slate-900 tabular-nums leading-none'>
            {bestSleep !== undefined ? (
              <>
                {bestSleep}
                <span className='text-xl font-medium text-slate-400'>h</span>
              </>
            ) : (
              <span className='text-slate-300'>--</span>
            )}
          </p>
        </div>

        <div className='h-px bg-slate-100'></div>

        <div>
          <p className='text-xs text-slate-400 mb-1'>Worst Night</p>
          <p className='text-4xl font-bold text-slate-900 tabular-nums leading-none'>
            {worstSleep !== undefined ? (
              <>
                {worstSleep}
                <span className='text-xl font-medium text-slate-400'>h</span>
              </>
            ) : (
              <span className='text-slate-300'>--</span>
            )}
          </p>
        </div>
      </div>

      <p className='text-sm text-slate-400 mt-6'>From all tracked records</p>
    </div>
  );
};

export default BestWorstSleep;
