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
      <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group'>
        <div className='text-center py-12'>
          <div className='text-6xl mb-4'>😴</div>
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
    <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900'>
            Sleep Analytics
          </h3>
          <p className='text-gray-500 text-sm mt-1'>
            Track your sleep patterns over time
          </p>
        </div>
        <div className='flex items-center gap-4 text-xs text-gray-500'>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-red-400 rounded-full'></div>
            <span>Poor</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-orange-400 rounded-full'></div>
            <span>Fair</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            <span>Good</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
            <span>Excellent</span>
          </div>
        </div>
      </div>
      
      <div className='h-80'>
        <BarChart records={records} />
      </div>
    </div>
  );
};

export default RecordChart;
