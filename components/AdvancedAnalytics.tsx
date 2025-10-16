'use client';
import { useState, useEffect } from 'react';
import { Record } from '@/types/Record';
import getRecords from '@/app/actions/getRecords';
import SleepTrendAnalysis from './SleepTrendAnalysis';
import SleepReports from './SleepReports';
import DataExport from './DataExport';

const AdvancedAnalytics = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'trends' | 'reports' | 'export'>('trends');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { records: fetchedRecords, error: fetchError } = await getRecords();
        if (fetchError) {
          setError(fetchError);
        } else {
          setRecords(fetchedRecords || []);
        }
      } catch {
        setError('Failed to load sleep records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
          <svg className="animate-spin w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Analytics</h3>
        <p className="text-slate-600">Preparing your sleep data analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Advanced Analytics</h2>
        <p className="text-slate-600">Deep insights into your sleep patterns and trends</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-slate-100 rounded-2xl p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'trends'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Trends</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'reports'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Reports</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('export')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'export'
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'trends' && <SleepTrendAnalysis records={records} />}
        {activeTab === 'reports' && <SleepReports records={records} />}
        {activeTab === 'export' && <DataExport records={records} />}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
