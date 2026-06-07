import AddNewRecord from '@/components/AddNewRecord';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import AIInsights from '@/components/AIInsights';
import AverageSleep from '@/components/AverageSleep';
import BestWorstSleep from '@/components/BestWorstSleep';
import Guest from '@/components/Guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
import SleepGoalStreak from '@/components/SleepGoalStreak';
import getRecords from '@/app/actions/getRecords';
import { getSleepStats } from '@/app/actions/getSleepStats';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let user = null;

  try {
    user = await currentUser();
  } catch (error) {
    console.error('Error fetching user:', error);
    return <Guest />;
  }

  if (!user) return <Guest />;

  let records: Awaited<ReturnType<typeof getRecords>>['records'] = [];
  let stats: Awaited<ReturnType<typeof getSleepStats>> = { error: 'Unable to load stats' };
  let dbError = false;

  try {
    const [recordsResult, statsResult] = await Promise.all([
      getRecords(),
      getSleepStats(),
    ]);
    records = recordsResult.records ?? [];
    stats = statsResult;
    if (recordsResult.error || ('error' in statsResult && statsResult.error)) {
      dbError = true;
    }
  } catch (error) {
    console.error('Dashboard load failed:', error);
    dbError = true;
  }

  const sleepStats = !('error' in stats) ? stats : null;

  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        {dbError && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
            Some data could not be loaded. Check that production{' '}
            <code className="text-xs">DATABASE_URL</code> is set on Vercel and the
            database schema is up to date.
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={user.imageUrl}
              alt={`${user.firstName}'s profile`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700"
            />
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {user.firstName}&apos;s Sleep
              </h1>
              <p className="text-xs text-slate-400">Dashboard overview</p>
            </div>
          </div>

          {sleepStats && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-full">
                {sleepStats.totalRecords} records
              </span>
              {sleepStats.streak > 0 && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50 px-2.5 py-1 rounded-full">
                  {sleepStats.streak}d streak
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-full">
                {sleepStats.progress.percentage}% on goal
              </span>
            </div>
          )}
        </div>

        {/* Stats row — 3 compact cards */}
        {sleepStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SleepGoalStreak
              goal={sleepStats.goal}
              streak={sleepStats.streak}
              progress={sleepStats.progress}
              sleepDebt={sleepStats.sleepDebt}
            />
            <AverageSleep />
            <BestWorstSleep />
          </div>
        )}

        {/* AI Insights — full width, separate row */}
        <AIInsights />

        {/* Chart + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <RecordChart />
          </div>
          <div className="lg:col-span-2">
            <AddNewRecord />
          </div>
        </div>

        {/* Analytics */}
        <AdvancedAnalytics records={records} />

        {/* History */}
        <RecordHistory />
      </div>
    </main>
  );
}
