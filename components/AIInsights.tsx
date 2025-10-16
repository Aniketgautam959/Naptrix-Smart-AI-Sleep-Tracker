'use client';
import { useState, useEffect } from 'react';
import { getAIInsights } from '@/app/actions/getAIInsights';

interface AIInsightsProps {
  className?: string;
}

export default function AIInsights({ className = '' }: AIInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await getAIInsights();
      if (result.error) {
        setError(result.error);
      } else {
        setInsights(result.insights || '');
      }
    } catch {
      setError('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-full min-h-[400px] ${className}`}>
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                AI Sleep Insights
              </h3>
              <p className="text-sm text-slate-600">Personalized recommendations</p>
            </div>
          </div>
          
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Refresh</span>
            )}
          </button>
        </div>

        <div className="space-y-6 flex-1 flex flex-col">
          {loading && (
            <div className="flex items-center justify-center py-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
                <span className="text-sm text-slate-600 font-medium">Analyzing your sleep patterns...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-red-800 font-semibold text-sm">Error</span>
                  <p className="text-red-700 mt-1 text-xs">{error}</p>
                </div>
              </div>
              {error.includes('API key') && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs">
                  <p className="text-slate-600 mb-2 font-medium">To enable AI insights:</p>
                  <div className="space-y-1 text-slate-500">
                    <p>1. Create .env.local file</p>
                    <p>2. Add: GEMINI_API_KEY=your_key</p>
                    <p>3. Restart the server</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {insights && !loading && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-slate-700">Sleep Recommendations</span>
              </div>
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm overflow-y-auto flex-1 space-y-2">
                {insights.split('\n').map((line, index) => {
                  if (line.trim() === '') return null;
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-semibold text-xs mt-1 flex-shrink-0">
                        {line.match(/^\d+\./)?.[0] || '•'}
                      </span>
                      <span className="text-slate-700 text-sm leading-relaxed">
                        {line.replace(/^\d+\.\s*/, '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!insights && !loading && !error && (
            <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-slate-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-slate-600 font-medium">No insights available</p>
              <p className="text-slate-500 text-sm mt-1">Add some sleep records to get personalized insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
