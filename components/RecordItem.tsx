'use client';
import { useState } from 'react';
import { Record } from '@/types/Record';
import deleteRecord from '@/app/actions/deleteRecord';

const RecordItem = ({ record, index }: { record: Record; index: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteRecord = async (recordId: string) => {
    setIsLoading(true); // Show loading spinner
    await deleteRecord(recordId); // Perform delete operation
    setIsLoading(false); // Hide loading spinner
  };

  // Determine sleep quality and styling
  const getSleepQuality = (hours: number) => {
    if (hours >= 8) return { quality: 'Excellent', color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', textColor: 'text-slate-700', iconColor: 'bg-slate-100' };
    if (hours >= 7) return { quality: 'Good', color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', textColor: 'text-slate-700', iconColor: 'bg-slate-100' };
    if (hours >= 6) return { quality: 'Fair', color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', textColor: 'text-slate-700', iconColor: 'bg-slate-100' };
    return { quality: 'Poor', color: 'slate', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', textColor: 'text-slate-700', iconColor: 'bg-slate-100' };
  };

  const sleepData = getSleepQuality(record?.amount || 0);

  return (
    <div className={`${sleepData.bgColor} border ${sleepData.borderColor} rounded-2xl shadow-sm p-6`}>
        <div className="flex items-center justify-between">
          {/* Left side - Sleep info */}
          <div className="flex items-center space-x-4">
            {/* Sleep quality icon */}
            <div className={`w-10 h-10 ${sleepData.iconColor} rounded-lg flex items-center justify-center border border-slate-200`}>
              {sleepData.quality === 'Excellent' && (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {sleepData.quality === 'Good' && (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {sleepData.quality === 'Fair' && (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              {sleepData.quality === 'Poor' && (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* Sleep details */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`text-sm font-semibold ${sleepData.textColor} px-3 py-1 rounded-full bg-white`}>
                  {sleepData.quality}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  #{index + 1}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-slate-800">
                    {record?.amount}h
                  </span>
                  <span className="text-sm text-slate-600">slept</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(record?.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </span>
                  
                  {record?.text && (
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="truncate max-w-32">{record.text}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Delete button */}
          <button
            onClick={() => handleDeleteRecord(record.id)}
            className={`w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label='Delete record'
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
    </div>
  );
};

export default RecordItem;
