import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='bg-white border border-red-200 rounded-2xl shadow-sm p-8 text-center'>
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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
          <svg className="w-10 h-10 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
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
            <svg className="w-8 h-8 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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
