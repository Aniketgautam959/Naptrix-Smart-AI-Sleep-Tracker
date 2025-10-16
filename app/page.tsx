import AddNewRecord from '@/components/AddNewRecord';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import AIInsights from '@/components/AIInsights';
import AverageSleep from '@/components/AverageSleep';
import BestWorstSleep from '@/components/BestWorstSleep';
import Guest from '@/components/Guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
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
  return (
    <main className='bg-slate-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Welcome Section */}
        <div className='mb-12'>
          <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8'>
            <div className='flex flex-col sm:flex-row items-start gap-8'>
              {/* User Image */}
              <div className='relative'>
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName}'s profile`}
                  width={96}
                  height={96}
                  className='w-24 h-24 rounded-full border-2 border-slate-200 shadow-sm'
                />
                <div className='absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                </div>
              </div>

              {/* User Details */}
              <div className='flex-1'>
                <h1 className='text-4xl font-bold text-slate-800 mb-3'>
                  Welcome back, {user.firstName}
                </h1>
                <p className='text-slate-600 mb-8 text-lg leading-relaxed'>
                  Track your sleep patterns and improve your rest quality with data-driven insights.
                </p>
                
                <div className='flex flex-wrap gap-8 text-sm'>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-slate-400 rounded-full'></div>
                    <span className='text-slate-500 font-medium'>Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-slate-500 font-medium'>
                      Last active {user.lastActiveAt
                        ? new Date(user.lastActiveAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })
                        : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='space-y-8'>
          {/* Chart Section */}
          <RecordChart />

          {/* Add Record Section */}
          <AddNewRecord />

          {/* Statistics and AI Insights Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AverageSleep />
            <BestWorstSleep />
            <div className='md:col-span-2 lg:col-span-1'>
              <AIInsights />
            </div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className='mt-12'>
          <AdvancedAnalytics />
        </div>

        {/* Sleep History */}
        <div className='mt-12'>
          <RecordHistory />
        </div>
      </div>
    </main>
  );
}
