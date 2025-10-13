import getBestWorstSleep from '@/app/actions/getBestWorstSleep';

const BestWorstSleep = async () => {
  const { bestSleep, worstSleep } = await getBestWorstSleep();

  return (
    <div className='card p-8 h-full min-h-[400px] flex flex-col justify-center'>
      <h3 className='text-2xl font-bold text-center mb-6 text-foreground'>
        Best and Worst Sleep
      </h3>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0'>
        {/* Best Sleep */}
        <div className='text-center'>
          <h4 className='text-lg font-medium text-muted-foreground mb-2'>
            Best Sleep
          </h4>
          <p className='text-3xl font-bold text-green-600'>
            {bestSleep !== undefined
              ? `${bestSleep} hours`
              : 'No data available'}
          </p>
        </div>

        {/* Divider */}
        <div className='hidden sm:block h-16 w-px bg-border'></div>

        {/* Worst Sleep */}
        <div className='text-center'>
          <h4 className='text-lg font-medium text-muted-foreground mb-2'>
            Worst Sleep
          </h4>
          <p className='text-3xl font-bold text-red-600'>
            {worstSleep !== undefined
              ? `${worstSleep} hours`
              : 'No data available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestWorstSleep;
