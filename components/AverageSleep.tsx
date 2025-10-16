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
      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8 h-full min-h-[400px] flex flex-col justify-center'>
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-slate-600"
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
      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8 h-full min-h-[400px] flex flex-col justify-center'>
        <div className="text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
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
