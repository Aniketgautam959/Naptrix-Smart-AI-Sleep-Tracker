import AddNewRecord from '@/components/AddNewRecord';
import AIInsights from '@/components/AIInsights';
import AverageSleep from '@/components/AverageSleep';
import BestWorstSleep from '@/components/BestWorstSleep';
import Guest from '@/components/Guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
import { currentUser } from '@clerk/nextjs/server';

export default async function HomePage() {
  const user = await currentUser();
  
  if (!user) {
    return <Guest />;
  }
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Welcome Section */}
        <div className='mb-12'>
          <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50'></div>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl transform translate-x-8 -translate-y-8'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100/40 to-orange-100/40 rounded-full blur-2xl transform -translate-x-6 translate-y-6'></div>
            
            <div className='relative flex flex-col sm:flex-row items-start gap-8'>
              {/* User Image */}
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName}'s profile`}
                  className='relative w-24 h-24 rounded-full border-4 border-white/50 dark:border-slate-700 shadow-xl hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center'>
                  <div className='w-3 h-3 bg-white rounded-full animate-pulse'></div>
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
                  <div className='flex items-center gap-3 group'>
                    <div className='w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full group-hover:scale-110 transition-transform duration-200'></div>
                    <span className='text-slate-500 font-medium'>Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}</span>
                  </div>
                  <div className='flex items-center gap-3 group'>
                    <div className='w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full group-hover:scale-110 transition-transform duration-200 animate-pulse'></div>
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
        <div className='space-y-10'>
          {/* Top Row - Chart and Add Record */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='lg:col-span-3 transform hover:scale-[1.02] transition-all duration-300'>
              <RecordChart />
            </div>
            <div className='lg:col-span-1 transform hover:scale-[1.02] transition-all duration-300'>
              <AddNewRecord />
            </div>
          </div>

          {/* Middle Row - Statistics and AI Insights */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='transform hover:scale-[1.02] transition-all duration-300'>
              <AverageSleep />
            </div>
            <div className='transform hover:scale-[1.02] transition-all duration-300'>
              <BestWorstSleep />
            </div>
            <div className='md:col-span-2 lg:col-span-1 transform hover:scale-[1.02] transition-all duration-300'>
              <AIInsights />
            </div>
          </div>
        </div>

        {/* Sleep History */}
        <div className='mt-12'>
          <RecordHistory />
        </div>
      </div>
    </main>
  );
}
