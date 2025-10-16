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
              className="w-6 h-6 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-slate-800'>
            Best and Worst Sleep
          </h3>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-8 sm:space-y-0'>
          {/* Best Sleep */}
          <div className='text-center flex-1'>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 mx-auto mb-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
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
          <div className='text-center flex-1'>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 mx-auto mb-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
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
