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
    <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group'>
      {/* Background decoration */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50'></div>
      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl transform translate-x-8 -translate-y-8'></div>
      
      <div className='relative'>
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
            <div className='w-3 h-3 bg-red-400 rounded-full'></div>
            <span>Poor</span>
            <div className='w-3 h-3 bg-orange-400 rounded-full'></div>
            <span>Fair</span>
            <div className='w-3 h-3 bg-green-400 rounded-full'></div>
            <span>Good</span>
            <div className='w-3 h-3 bg-blue-400 rounded-full'></div>
            <span>Excellent</span>
          </div>
        </div>
        
        <div className='h-80'>
          <BarChart records={records} />
        </div>
      </div>
    </div>
  );
};

export default RecordChart;
