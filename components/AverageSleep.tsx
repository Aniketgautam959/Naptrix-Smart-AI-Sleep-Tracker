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
      <div className='card p-8 text-center h-full min-h-[400px] flex flex-col justify-center'>
        <h4 className='text-lg font-medium text-muted-foreground mb-2'>
          Your Average Sleep Last Month
        </h4>
        <h1 className='sm:text-3xl text-2xl font-bold text-foreground'>
          {hours} hours {minutes} minutes
        </h1>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user record:', error);
    return (
      <div className='card p-8 text-center h-full min-h-[400px] flex flex-col justify-center'>
        <h4 className='text-lg font-medium text-muted-foreground mb-2'>Error</h4>
        <p className='text-red-600'>Unable to calculate average sleep.</p>
      </div>
    );
  }
};

export default AverageSleep;
