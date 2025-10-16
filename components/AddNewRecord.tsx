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
    <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-8'>
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
              <option value='Refreshed'>Refreshed</option>
              <option value='Tired'>Tired</option>
              <option value='Neutral'>Neutral</option>
              <option value='Exhausted'>Exhausted</option>
              <option value='Energetic'>Energetic</option>
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
              className='w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider'
            />
            <div className='flex justify-between text-xs text-slate-500 mt-2'>
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>
          <div className='text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-lg font-semibold text-lg'>
              <span>{amount} hours</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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
            <span>Add Sleep Record</span>
          )}
        </button>
      </form>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mt-6 p-4 rounded-xl text-sm font-medium ${
            alertType === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className='flex items-center gap-2'>
            {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecord;
