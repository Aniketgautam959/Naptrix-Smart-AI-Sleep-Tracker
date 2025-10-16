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
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
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
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Average Sleep</h3>
          <p className="text-4xl font-bold text-slate-800 mb-2">{hours}h {minutes}m</p>
          <p className="text-slate-600">
            Based on {validDays} day{validDays !== 1 ? 's' : ''} of data
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user record:', error);
    return (
      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8 h-full min-h-[400px] flex flex-col justify-center'>
        <div className="text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Average Sleep</h3>
          <p className="text-4xl font-bold text-slate-800 mb-2">--</p>
          <p className="text-slate-600">Unable to calculate</p>
        </div>
      </div>
    );
  }
};

export default AverageSleep;