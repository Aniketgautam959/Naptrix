import AddNewRecord from '@/components/AddNewRecord';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import AIInsights from '@/components/AIInsights';
import AverageSleep from '@/components/AverageSleep';
import BestWorstSleep from '@/components/BestWorstSleep';
import Guest from '@/components/Guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
import getRecords from '@/app/actions/getRecords';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

// Force dynamic rendering since we use currentUser()
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let user = null;

  try {
    user = await currentUser();
  } catch (error) {
    console.error('Error fetching user:', error);
    // If there's an error with Clerk, show guest view
    return <Guest />;
  }

  if (!user) {
    return <Guest />;
  }

  // Fetch records server-side so client components don't need auth context
  const { records = [] } = await getRecords();

  return (
    <main className='bg-slate-50 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        {/* Welcome Header */}
        <div className='flex items-center gap-4 mb-10 pb-8 border-b border-slate-100'>
          <Image
            src={user.imageUrl}
            alt={`${user.firstName}'s profile`}
            width={48}
            height={48}
            className='w-12 h-12 rounded-full border border-slate-200'
          />
          <div className='flex-1'>
            <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>
              Welcome back, {user.firstName}
            </h1>
            <p className='text-sm text-slate-400 mt-0.5'>
              Track your sleep patterns and improve your rest quality.
            </p>
          </div>
          <div className='hidden sm:flex items-center gap-6 text-xs text-slate-400'>
            <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            <span className='w-px h-3 bg-slate-200'></span>
            <span>Active {user.lastActiveAt ? new Date(user.lastActiveAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className='space-y-6'>
          <RecordChart />
          <AddNewRecord />

          {/* Stats Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='min-h-[220px]'><AverageSleep /></div>
            <div className='min-h-[220px]'><BestWorstSleep /></div>
            <div className='md:col-span-2 lg:col-span-1 min-h-[220px]'><AIInsights /></div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className='mt-6'>
          <AdvancedAnalytics records={records} />
        </div>

        {/* Sleep History */}
        <div className='mt-6'>
          <RecordHistory />
        </div>
      </div>
    </main>
  );
}
