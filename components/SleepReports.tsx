'use client';
import { useState, useEffect } from 'react';
import { Record } from '@/types/Record';

interface SleepReportsProps {
  records: Record[];
}

interface ReportData {
  period: string;
  totalSleep: number;
  averageSleep: number;
  bestSleep: number;
  worstSleep: number;
  qualityScore: number;
  consistency: number;
  totalDays: number;
  recordsCount: number;
}

const SleepReports = ({ records }: SleepReportsProps) => {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [selectedReport, setSelectedReport] = useState<'week' | 'month'>('week');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  useEffect(() => {
    if (records.length === 0) return;

    const generateReports = () => {
      const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const reports: ReportData[] = [];

      if (selectedReport === 'week') {
        // Generate weekly reports for last 8 weeks
        const weeks = new Map<string, Record[]>();
        sortedRecords.forEach(record => {
          const date = new Date(record.date);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekKey = weekStart.toISOString().split('T')[0];
          
          if (!weeks.has(weekKey)) {
            weeks.set(weekKey, []);
          }
          weeks.get(weekKey)!.push(record);
        });

        const weekEntries = Array.from(weeks.entries()).slice(-8);
        weekEntries.forEach(([weekKey, weekRecords]) => {
          const totalSleep = weekRecords.reduce((sum, r) => sum + r.amount, 0);
          const averageSleep = totalSleep / weekRecords.length;
          const bestSleep = Math.max(...weekRecords.map(r => r.amount));
          const worstSleep = Math.min(...weekRecords.map(r => r.amount));
          const qualityScore = calculateQualityScore(weekRecords);
          const consistency = calculateConsistency(weekRecords);
          
          const weekStart = new Date(weekKey);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          
          reports.push({
            period: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
            totalSleep,
            averageSleep,
            bestSleep,
            worstSleep,
            qualityScore,
            consistency,
            totalDays: 7,
            recordsCount: weekRecords.length
          });
        });
      } else {
        // Generate monthly reports for last 6 months
        const months = new Map<string, Record[]>();
        sortedRecords.forEach(record => {
          const date = new Date(record.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!months.has(monthKey)) {
            months.set(monthKey, []);
          }
          months.get(monthKey)!.push(record);
        });

        const monthEntries = Array.from(months.entries()).slice(-6);
        monthEntries.forEach(([monthKey, monthRecords]) => {
          const totalSleep = monthRecords.reduce((sum, r) => sum + r.amount, 0);
          const averageSleep = totalSleep / monthRecords.length;
          const bestSleep = Math.max(...monthRecords.map(r => r.amount));
          const worstSleep = Math.min(...monthRecords.map(r => r.amount));
          const qualityScore = calculateQualityScore(monthRecords);
          const consistency = calculateConsistency(monthRecords);
          
          const monthDate = new Date(monthKey + '-01');
          const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
          
          reports.push({
            period: monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            totalSleep,
            averageSleep,
            bestSleep,
            worstSleep,
            qualityScore,
            consistency,
            totalDays: daysInMonth,
            recordsCount: monthRecords.length
          });
        });
      }

      setReportData(reports);
      if (reports.length > 0) {
        setSelectedPeriod(reports[reports.length - 1].period);
      }
    };

    generateReports();
  }, [records, selectedReport]);

  const calculateQualityScore = (records: Record[]): number => {
    if (records.length === 0) return 0;
    
    const scores = records.map(record => {
      if (record.amount >= 8) return 100;
      if (record.amount >= 7) return 80;
      if (record.amount >= 6) return 60;
      if (record.amount >= 5) return 40;
      return 20;
    });
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const calculateConsistency = (records: Record[]): number => {
    if (records.length < 2) return 100;
    
    const amounts = records.map(r => r.amount);
    const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
    const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / amounts.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Convert to percentage (lower deviation = higher consistency)
    return Math.max(0, Math.round(100 - (standardDeviation * 20)));
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getConsistencyColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentReport = reportData.find(r => r.period === selectedPeriod);

  if (records.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 text-center group">
        <div className="absolute inset-0 bg-slate-50/50"></div>
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
            <svg className="w-8 h-8 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Data for Reports</h3>
          <p className="text-slate-600">Add more sleep records to generate detailed reports</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-50/50"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Sleep Reports</h3>
              <p className="text-slate-600">Detailed analysis and insights</p>
            </div>
          </div>
          
          {/* Report Type Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedReport('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedReport === 'week'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedReport('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedReport === 'month'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Period Selector */}
        {reportData.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {reportData.map((report, index) => (
                <option key={index} value={report.period}>
                  {report.period}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Current Report Details */}
        {currentReport && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">{currentReport.averageSleep.toFixed(1)}h</div>
                <div className="text-sm text-slate-600">Average Sleep</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">{currentReport.bestSleep}h</div>
                <div className="text-sm text-slate-600">Best Sleep</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">{currentReport.worstSleep}h</div>
                <div className="text-sm text-slate-600">Worst Sleep</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">{currentReport.recordsCount}</div>
                <div className="text-sm text-slate-600">Records</div>
              </div>
            </div>

            {/* Quality and Consistency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-800">Sleep Quality</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQualityColor(currentReport.qualityScore)}`}>
                    {currentReport.qualityScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      currentReport.qualityScore >= 80 ? 'bg-slate-600' :
                      currentReport.qualityScore >= 60 ? 'bg-slate-500' :
                      currentReport.qualityScore >= 40 ? 'bg-slate-500' :
                      'bg-slate-500'
                    }`}
                    style={{ width: `${currentReport.qualityScore}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-800">Consistency</h4>
                  <span className={`text-sm font-medium ${getConsistencyColor(currentReport.consistency)}`}>
                    {currentReport.consistency}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      currentReport.consistency >= 80 ? 'bg-slate-600' :
                      currentReport.consistency >= 60 ? 'bg-slate-500' :
                      currentReport.consistency >= 40 ? 'bg-slate-500' :
                      'bg-slate-500'
                    }`}
                    style={{ width: `${currentReport.consistency}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Total Sleep Time:</span>
                  <span className="font-semibold text-slate-800 ml-2">{currentReport.totalSleep.toFixed(1)} hours</span>
                </div>
                <div>
                  <span className="text-slate-600">Tracking Days:</span>
                  <span className="font-semibold text-slate-800 ml-2">{currentReport.recordsCount}/{currentReport.totalDays}</span>
                </div>
                <div>
                  <span className="text-slate-600">Coverage:</span>
                  <span className="font-semibold text-slate-800 ml-2">
                    {Math.round((currentReport.recordsCount / currentReport.totalDays) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepReports;
