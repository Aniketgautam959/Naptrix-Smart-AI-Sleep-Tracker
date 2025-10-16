import getRecords from '@/app/actions/getRecords';
import BarChart from './BarChart'; // Ensure BarChart.tsx or BarChart.jsx exists in the same directory

const RecordChart = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='bg-red-100 text-red-800 border border-red-300 rounded-md p-4 text-center'>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8'>
        <div className='text-center py-12'>
          <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200'>
            <svg
              className='w-8 h-8 text-slate-800'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'/>
            </svg>
          </div>
          <h3 className='text-3xl font-bold text-slate-800 mb-4'>
            No Sleep Records Found
          </h3>
          <p className='text-slate-600'>
            Start tracking your sleep to see your records here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h3 className='text-3xl font-bold text-slate-800'>
            Sleep Records Chart
          </h3>
          <p className='text-slate-600 mt-2'>
            Track your sleep patterns over time
          </p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <div className='w-3 h-3 bg-red-500 rounded-full'></div>
          <span>Poor</span>
          <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
          <span>Fair</span>
          <div className='w-3 h-3 bg-green-500 rounded-full'></div>
          <span>Good</span>
          <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
          <span>Excellent</span>
        </div>
      </div>
      
      <div className='h-80'>
        <BarChart records={records} />
      </div>
    </div>
  );
};

export default RecordChart;