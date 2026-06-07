'use client';

import { useRef, useState } from 'react';
import addSleepRecord from '@/app/actions/addSleepRecord';
import { Card, CardHeader } from '@/components/ui/Card';

const QUALITIES = ['Refreshed', 'Energetic', 'Neutral', 'Tired', 'Exhausted'] as const;

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(7);
  const [sleepQuality, setSleepQuality] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);
    formData.set('amount', amount.toString());
    formData.set('text', sleepQuality);

    const { error } = await addSleepRecord(formData);

    if (error) {
      setAlertMessage(error);
      setAlertType('error');
    } else {
      setAlertMessage('Record saved');
      setAlertType('success');
      formRef.current?.reset();
      setAmount(7);
      setSleepQuality('');
    }
    setIsLoading(false);
  };

  return (
    <Card padding='lg'>
      <CardHeader title='Log Sleep' subtitle='Add tonight&apos;s sleep data' />

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          clientAction(new FormData(formRef.current!));
        }}
        className='space-y-5'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='date' className='text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'>
              Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              defaultValue={today}
              className='input h-10'
              required
            />
          </div>
          <div>
            <label className='text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block'>
              Hours — <span className='text-slate-900 dark:text-slate-100 font-semibold'>{amount}h</span>
            </label>
            <input
              type='range'
              name='amount'
              min='0'
              max='12'
              step='0.5'
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className='w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer slider mt-4'
            />
          </div>
        </div>

        <div>
          <label className='text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block'>
            How did you feel?
          </label>
          <div className='flex flex-wrap gap-2'>
            {QUALITIES.map((q) => (
              <button
                key={q}
                type='button'
                onClick={() => setSleepQuality(q)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  sleepQuality === q
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <input type='hidden' name='text' value={sleepQuality} />
        </div>

        <button
          type='submit'
          disabled={isLoading || !sleepQuality}
          className='w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Saving...' : 'Save Record'}
        </button>
      </form>

      {alertMessage && (
        <p
          className={`mt-3 text-xs font-medium ${
            alertType === 'success'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {alertMessage}
        </p>
      )}
    </Card>
  );
};

export default AddRecord;
