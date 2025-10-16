import getBestWorstSleep from '@/app/actions/getBestWorstSleep';

const BestWorstSleep = async () => {
  const { bestSleep, worstSleep } = await getBestWorstSleep();

  return (
    <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8 h-full min-h-[400px] flex flex-col justify-center'>
      <div className="relative">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200">
            <svg
              className="w-6 h-6 text-slate-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-slate-800'>
            Best and Worst Sleep
          </h3>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-8 sm:space-y-0 sm:gap-8'>
          {/* Best Sleep */}
          <div className='text-center w-full sm:w-48'>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full">
              <div className="w-10 h-10 mx-auto mb-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <svg
                  className="w-5 h-5 text-slate-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-slate-700 mb-3'>
                Best Sleep
              </h4>
              <p className='text-3xl font-bold text-slate-800'>
                {bestSleep !== undefined
                  ? `${bestSleep}h`
                  : 'No data'}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className='hidden sm:block h-20 w-px bg-slate-200'></div>

          {/* Worst Sleep */}
          <div className='text-center w-full sm:w-48'>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full">
              <div className="w-10 h-10 mx-auto mb-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <svg
                  className="w-5 h-5 text-slate-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-slate-700 mb-3'>
                Worst Sleep
              </h4>
              <p className='text-3xl font-bold text-slate-800'>
                {worstSleep !== undefined
                  ? `${worstSleep}h`
                  : 'No data'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestWorstSleep;
