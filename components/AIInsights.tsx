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
    } catch (err) {
      setError('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className={`relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 h-full min-h-[400px] group ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-2xl transform translate-x-4 -translate-y-4"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
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
            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
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
              <>
                <span>Refresh</span>
                <span>✨</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-6 flex-1 flex flex-col">
          {loading && (
            <div className="flex items-center justify-center py-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <span className="text-sm text-slate-600 font-medium">Analyzing your sleep patterns...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
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
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 rounded-xl border border-blue-200 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧠</span>
                <span className="text-sm font-semibold text-slate-700">AI Analysis</span>
              </div>
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm overflow-y-auto flex-1">
                {insights}
              </div>
            </div>
          )}

          {!insights && !loading && !error && (
            <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
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
