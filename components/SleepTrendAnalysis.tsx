'use client';
import { useState, useEffect } from 'react';
import { Record } from '@/types/Record';

interface SleepTrendAnalysisProps {
  records: Record[];
}

interface TrendData {
  period: string;
  averageSleep: number;
  trend: 'improving' | 'declining' | 'stable';
  change: number;
  qualityScore: number;
}

const SleepTrendAnalysis = ({ records }: SleepTrendAnalysisProps) => {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  useEffect(() => {
    if (records.length === 0) return;

    const calculateTrends = () => {
      const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const trends: TrendData[] = [];

      if (selectedPeriod === 'week') {
        // Group by weeks
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

        const weekEntries = Array.from(weeks.entries()).slice(-8); // Last 8 weeks
        weekEntries.forEach(([weekKey, weekRecords], index) => {
          const avgSleep = weekRecords.reduce((sum, r) => sum + r.amount, 0) / weekRecords.length;
          const qualityScore = calculateQualityScore(weekRecords);
          
          let trend: 'improving' | 'declining' | 'stable' = 'stable';
          let change = 0;
          
          if (index > 0) {
            const prevWeek = trends[trends.length - 1];
            change = avgSleep - prevWeek.averageSleep;
            if (change > 0.5) trend = 'improving';
            else if (change < -0.5) trend = 'declining';
          }

          trends.push({
            period: new Date(weekKey).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            averageSleep: avgSleep,
            trend,
            change,
            qualityScore
          });
        });
      } else {
        // Group by months
        const months = new Map<string, Record[]>();
        sortedRecords.forEach(record => {
          const date = new Date(record.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!months.has(monthKey)) {
            months.set(monthKey, []);
          }
          months.get(monthKey)!.push(record);
        });

        const monthEntries = Array.from(months.entries()).slice(-6); // Last 6 months
        monthEntries.forEach(([monthKey, monthRecords], index) => {
          const avgSleep = monthRecords.reduce((sum, r) => sum + r.amount, 0) / monthRecords.length;
          const qualityScore = calculateQualityScore(monthRecords);
          
          let trend: 'improving' | 'declining' | 'stable' = 'stable';
          let change = 0;
          
          if (index > 0) {
            const prevMonth = trends[trends.length - 1];
            change = avgSleep - prevMonth.averageSleep;
            if (change > 0.5) trend = 'improving';
            else if (change < -0.5) trend = 'declining';
          }

          trends.push({
            period: new Date(monthKey + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            averageSleep: avgSleep,
            trend,
            change,
            qualityScore
          });
        });
      }

      setTrendData(trends);
    };

    calculateTrends();
  }, [records, selectedPeriod]);

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return (
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        );
      case 'declining':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'declining': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  if (records.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 text-center group">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Data for Analysis</h3>
          <p className="text-slate-600">Add more sleep records to see trend analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Sleep Trend Analysis</h3>
              <p className="text-slate-600">Track your sleep patterns over time</p>
            </div>
          </div>
          
          {/* Period Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === 'week'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === 'month'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-slate-800">Sleep Hours Trend</h4>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Improving</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                  <span>Stable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Declining</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 flex items-end space-x-3 relative">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-full text-xs text-slate-500 font-medium pr-2">
                <span>10h</span>
                <span>8h</span>
                <span>6h</span>
                <span>4h</span>
                <span>2h</span>
                <span>0h</span>
              </div>
              
              {/* Chart area */}
              <div className="flex-1 flex items-end space-x-2 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="border-t border-slate-200 opacity-30"></div>
                  ))}
                </div>
                
                {/* Bars */}
                {trendData.map((data, index) => {
                  const maxHeight = 200; // Maximum height in pixels
                  const barHeight = Math.max(30, (data.averageSleep / 10) * maxHeight);
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-3 group">
                      {/* Bar container */}
                      <div className="w-full relative">
                        {/* Bar */}
                        <div
                          className={`w-full rounded-t-lg transition-all duration-700 hover:scale-105 cursor-pointer relative ${
                            data.trend === 'improving' ? 'bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-emerald-200' :
                            data.trend === 'declining' ? 'bg-gradient-to-t from-red-500 to-red-400 shadow-red-200' :
                            'bg-gradient-to-t from-slate-500 to-slate-400 shadow-slate-200'
                          }`}
                          style={{ height: `${barHeight}px` }}
                        >
                          {/* Bar value on hover */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {data.averageSleep.toFixed(1)}h
                          </div>
                          
                          {/* Trend indicator */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            {data.trend === 'improving' && (
                              <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-emerald-600"></div>
                            )}
                            {data.trend === 'declining' && (
                              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-red-600"></div>
                            )}
                            {data.trend === 'stable' && (
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Period label */}
                      <div className="text-xs text-slate-600 font-medium text-center">
                        <div className="font-bold text-slate-800">{data.averageSleep.toFixed(1)}h</div>
                        <div className="text-slate-500">{data.period}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* X-axis label */}
            <div className="text-center mt-4 text-sm text-slate-600 font-medium">
              {selectedPeriod === 'week' ? 'Weeks' : 'Months'}
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        {trendData.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(trendData.reduce((sum, d) => sum + d.averageSleep, 0) / trendData.length).toFixed(1)}h
                    </div>
                    <div className="text-sm text-blue-700">Overall Average</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {trendData.filter(d => d.trend === 'improving').length}
                    </div>
                    <div className="text-sm text-emerald-700">Improving Periods</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(trendData.reduce((sum, d) => sum + d.qualityScore, 0) / trendData.length)}
                    </div>
                    <div className="text-sm text-purple-700">Avg Quality Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trend Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Recent Periods</h4>
          {trendData.slice(-3).map((data, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getTrendColor(data.trend)}`}>
                  {getTrendIcon(data.trend)}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{data.period}</div>
                  <div className="text-sm text-slate-600">
                    {data.averageSleep.toFixed(1)}h average • Quality: {data.qualityScore}/100
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  data.trend === 'improving' ? 'text-emerald-600' :
                  data.trend === 'declining' ? 'text-red-600' :
                  'text-slate-600'
                }`}>
                  {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}h
                </div>
                <div className="text-xs text-slate-500 capitalize">{data.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SleepTrendAnalysis;
