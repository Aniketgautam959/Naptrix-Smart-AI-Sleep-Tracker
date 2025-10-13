'use client';
import { useRef, useState } from 'react';
import addSleepRecord from '@/app/actions/addSleepRecord';

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(6); // Default value for the slider
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); // State for alert type
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [sleepQuality, setSleepQuality] = useState(''); // State for selected sleep quality

  const clientAction = async (formData: FormData) => {
    setIsLoading(true); // Show spinner
    setAlertMessage(null); // Clear previous messages

    formData.set('amount', amount.toString()); // Add the slider value to the form data
    formData.set('text', sleepQuality); // Add the selected sleep quality to the form data

    const { error } = await addSleepRecord(formData); // Removed `data` since it's unused

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType('error'); // Set alert type to error
    } else {
      setAlertMessage('Sleep record added successfully!');
      setAlertType('success'); // Set alert type to success
      formRef.current?.reset();
      setAmount(6); // Reset the slider to the default value
      setSleepQuality(''); // Reset the sleep quality
    }

    setIsLoading(false); // Hide spinner
  };

  return (
    <div className='relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group'>
      {/* Background decoration */}
      <div className='absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50'></div>
      <div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100/40 to-blue-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6'></div>
      
      <div className='relative'>
        <div className='text-center mb-8'>
          <h3 className='text-3xl font-bold text-slate-800 mb-2'>
            Track Your Sleep
          </h3>
          <p className='text-slate-600'>
            Log your sleep data and insights
          </p>
        </div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className='space-y-6'
      >
        {/* Sleep Quality and Sleep Date */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Sleep Quality */}
          <div className='space-y-2'>
            <label
              htmlFor='text'
              className='text-sm font-semibold text-slate-700 block'
            >
              Sleep Quality
            </label>
            <select
              id='text'
              name='text'
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
              className='w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              required
            >
              <option value='' disabled>
                Select quality...
              </option>
              <option value='Refreshed'>🌞 Refreshed</option>
              <option value='Tired'>😴 Tired</option>
              <option value='Neutral'>😐 Neutral</option>
              <option value='Exhausted'>😫 Exhausted</option>
              <option value='Energetic'>⚡ Energetic</option>
            </select>
          </div>

          {/* Sleep Date */}
          <div className='space-y-2'>
            <label
              htmlFor='date'
              className='text-sm font-semibold text-slate-700 block'
            >
              Sleep Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              className='w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              required
              onFocus={(e) => e.target.showPicker()}
            />
          </div>
        </div>

        {/* Hours Slept */}
        <div className='space-y-4'>
          <label
            htmlFor='amount'
            className='text-sm font-semibold text-slate-700 block'
          >
            Hours Slept
            <span className='text-xs text-slate-500 ml-2 font-normal'>
              (0-12 hours in 0.5 increments)
            </span>
          </label>
          <div className='relative'>
            <input
              type='range'
              name='amount'
              id='amount'
              min='0'
              max='12'
              step='0.5'
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className='w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider'
            />
            <div className='flex justify-between text-xs text-slate-500 mt-2'>
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>
          <div className='text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg'>
              <span className='text-2xl'>😴</span>
              <span>{amount} hours</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className='animate-spin h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                ></path>
              </svg>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <span>Add Sleep Record</span>
              <span className='text-xl'>✨</span>
            </>
          )}
        </button>
      </form>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mt-6 p-4 rounded-xl text-sm font-medium ${
            alertType === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-300 dark:border-green-700'
              : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border border-red-200 dark:from-red-900/20 dark:to-pink-900/20 dark:text-red-300 dark:border-red-700'
          }`}
        >
          <div className='flex items-center gap-2'>
            <span className='text-lg'>
              {alertType === 'success' ? '✅' : '❌'}
            </span>
            {alertMessage}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddRecord;
