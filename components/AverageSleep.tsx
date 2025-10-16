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
              className="w-8 h-8 text-slate-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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
              className="w-8 h-8 text-slate-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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