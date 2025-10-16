import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='bg-white border border-red-200 rounded-2xl shadow-sm p-8 text-center'>
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Records</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center'>
        <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    );
  }

  return (
    <div className='bg-white border border-slate-200 rounded-2xl shadow-sm'>
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className='text-3xl font-bold text-slate-800 mb-2'>
            Sleep History
          </h3>
          <p className="text-slate-600">
            Track your sleep patterns over time
          </p>
          <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Records List */}
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {records.map((record: Record, index: number) => (
            <div key={record.id}>
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
