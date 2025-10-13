import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-red-200 rounded-3xl shadow-xl p-8 text-center'>
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-yellow-50/50"></div>
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Records</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 text-center group'>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
        
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className='text-2xl font-bold mb-4 text-slate-800'>
            No Sleep Records Found
          </h3>
          <p className='text-slate-600 text-lg'>
            Start tracking your sleep to see your history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl group'>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/40 to-pink-100/40 rounded-full blur-2xl transform -translate-x-6 translate-y-6"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className='text-3xl font-bold text-slate-800 mb-2'>
            Sleep History
          </h3>
          <p className="text-slate-600">
            Track your sleep patterns over time
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Records List */}
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {records.map((record: Record, index: number) => (
            <div key={record.id} className="transform hover:scale-[1.02] transition-all duration-300">
              <RecordItem record={record} index={index} />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span className="font-medium">Total Records: {records.length}</span>
            <span className="font-medium">
              Average: {(records.reduce((sum, r) => sum + r.amount, 0) / records.length).toFixed(1)}h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordHistory;
