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
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full'>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-600"
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
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{hours}h {minutes}m</p>
            <p className="text-emerald-600 text-sm font-medium">2▲ from last month</p>
          </div>
        </div>
        
        <div>
          <h4 className='text-sm font-medium text-gray-500 mb-1'>
            Average Sleep
          </h4>
          <p className="text-xs text-gray-400">
            Based on {validDays} day{validDays !== 1 ? 's' : ''} of data
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user record:', error);
    return (
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full'>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
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
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-red-600 text-sm font-medium">Error</p>
          </div>
        </div>
        
        <div>
          <h4 className='text-sm font-medium text-gray-500 mb-1'>Average Sleep</h4>
          <p className="text-xs text-gray-400">Unable to calculate</p>
        </div>
      </div>
    );
  }
};

export default AverageSleep;
