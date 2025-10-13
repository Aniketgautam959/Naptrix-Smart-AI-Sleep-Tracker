import React from 'react';
import getUserRecord from '@/app/actions/getUserRecord';

const AverageSleep = async () => {
  try {
    const { record, daysWithRecords } = await getUserRecord();

    // Ensure valid numbers
    const validRecord = record || 0;
    const validDays =
      daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1; // Fallback to 1 to avoid division by 0

    // Calculate the average sleep for the days with records
    const averageSleep = validRecord / validDays;

    // Extract hours and minutes
    const hours = Math.floor(averageSleep);
    const minutes = Math.round((averageSleep - hours) * 60);

    return (
      <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 h-full min-h-[400px] flex flex-col justify-center group'>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-100/40 to-pink-100/40 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>
        
        <div className="relative text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h4 className='text-lg font-semibold text-slate-600 mb-4'>
            Your Average Sleep Last Month
          </h4>
          <div className="space-y-2">
            <h1 className='text-4xl font-bold text-slate-800'>
              {hours}h {minutes}m
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Based on {validDays} day{validDays !== 1 ? 's' : ''} of data
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user record:', error);
    return (
      <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 h-full min-h-[400px] flex flex-col justify-center group'>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-yellow-50/50"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-100/40 to-orange-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
        
        <div className="relative text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h4 className='text-lg font-semibold text-slate-600 mb-4'>Error</h4>
          <p className='text-red-600 font-medium'>Unable to calculate average sleep.</p>
        </div>
      </div>
    );
  }
};

export default AverageSleep;
