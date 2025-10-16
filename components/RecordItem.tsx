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
                <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
              {sleepData.quality === 'Good' && (
                <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              )}
              {sleepData.quality === 'Fair' && (
                <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              )}
              {sleepData.quality === 'Poor' && (
                <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>{new Date(record?.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </span>
                  
                  {record?.text && (
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            )}
          </button>
        </div>
    </div>
  );
};

export default RecordItem;
