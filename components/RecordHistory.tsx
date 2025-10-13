import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className='bg-red-100 text-red-800 border border-red-300 rounded-md p-4 text-center'>
        <p>{error}</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className='card p-8 text-center'>
        <h3 className='text-2xl font-bold mb-4 text-foreground'>
          No Sleep Records Found
        </h3>
        <p className='text-muted-foreground'>
          Start tracking your sleep to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='card p-8 mx-auto'>
        <h3 className='text-2xl font-bold text-center mb-6 text-foreground border-b border-border pb-6'>
          Sleep History
        </h3>
        <ul className='space-y-4'>
          {records.map((record: Record) => (
            <RecordItem key={record.id} record={record} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordHistory;
