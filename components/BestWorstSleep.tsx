import getBestWorstSleep from '@/app/actions/getBestWorstSleep';

const BestWorstSleep = async () => {
  const { bestSleep, worstSleep } = await getBestWorstSleep();

  return (
    <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 h-full min-h-[400px] flex flex-col justify-center group'>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100/40 to-green-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-100/40 to-pink-100/40 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>
      
      <div className="relative">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-slate-600 mb-3'>
                Best Sleep
              </h4>
              <p className='text-3xl font-bold text-emerald-600'>
                {bestSleep !== undefined
                  ? `${bestSleep}h`
                  : 'No data'}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className='hidden sm:block h-20 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200'></div>

          {/* Worst Sleep */}
          <div className='text-center flex-1'>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-slate-600 mb-3'>
                Worst Sleep
              </h4>
              <p className='text-3xl font-bold text-red-600'>
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
