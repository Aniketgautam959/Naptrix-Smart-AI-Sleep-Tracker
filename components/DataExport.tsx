'use client';
import { useState } from 'react';
import { Record } from '@/types/Record';

interface DataExportProps {
  records: Record[];
}

const DataExport = ({ records }: DataExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  const exportToCSV = () => {
    if (records.length === 0) return;

    setIsExporting(true);
    
    // Prepare CSV data
    const csvHeaders = ['Date', 'Hours Slept', 'Sleep Quality', 'Notes'];
    const csvData = records.map(record => [
      new Date(record.date).toLocaleDateString('en-US'),
      record.amount.toString(),
      record.text || 'No notes',
      record.text || ''
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sleep-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const exportToPDF = () => {
    if (records.length === 0) return;

    setIsExporting(true);
    
    // Create PDF content
    const generatePDFContent = () => {
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const totalRecords = records.length;
      const totalSleep = records.reduce((sum, r) => sum + r.amount, 0);
      const averageSleep = totalSleep / totalRecords;
      const bestSleep = Math.max(...records.map(r => r.amount));
      const worstSleep = Math.min(...records.map(r => r.amount));

      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sleep Data Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #2563eb; margin-bottom: 10px; }
            .summary { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
            .summary-item { text-align: center; }
            .summary-value { font-size: 24px; font-weight: bold; color: #1e40af; }
            .summary-label { font-size: 14px; color: #64748b; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
            th { background: #f1f5f9; font-weight: 600; color: #475569; }
            .quality-excellent { color: #059669; font-weight: bold; }
            .quality-good { color: #2563eb; font-weight: bold; }
            .quality-fair { color: #d97706; font-weight: bold; }
            .quality-poor { color: #dc2626; font-weight: bold; }
            .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sleep Data Report</h1>
            <p>Generated on ${currentDate}</p>
          </div>
          
          <div class="summary">
            <h2>Summary Statistics</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-value">${totalRecords}</div>
                <div class="summary-label">Total Records</div>
              </div>
              <div class="summary-item">
                <div class="summary-value">${averageSleep.toFixed(1)}h</div>
                <div class="summary-label">Average Sleep</div>
              </div>
              <div class="summary-item">
                <div class="summary-value">${bestSleep}h</div>
                <div class="summary-label">Best Sleep</div>
              </div>
              <div class="summary-item">
                <div class="summary-value">${worstSleep}h</div>
                <div class="summary-label">Worst Sleep</div>
              </div>
            </div>
          </div>

          <h2>Sleep Records</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours Slept</th>
                <th>Sleep Quality</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(record => {
                const quality = record.amount >= 8 ? 'Excellent' : 
                              record.amount >= 7 ? 'Good' : 
                              record.amount >= 6 ? 'Fair' : 'Poor';
                const qualityClass = quality.toLowerCase();
                return `
                  <tr>
                    <td>${new Date(record.date).toLocaleDateString('en-US')}</td>
                    <td>${record.amount} hours</td>
                    <td class="quality-${qualityClass}">${quality}</td>
                    <td>${record.text || 'No notes'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>This report was generated by Naptrix Sleep Tracker</p>
          </div>
        </body>
        </html>
      `;

      return htmlContent;
    };

    // Create a new window with the PDF content
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatePDFContent());
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsExporting(false);
      }, 1000);
    } else {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  if (records.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 text-center group">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Data to Export</h3>
          <p className="text-slate-600">Add sleep records to enable data export</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Export Sleep Data</h3>
          <p className="text-slate-600">Download your sleep records in various formats</p>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Choose Export Format:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setExportFormat('csv')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  exportFormat === 'csv'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="text-left">
                    <div className="font-semibold">CSV File</div>
                    <div className="text-sm opacity-75">Spreadsheet format</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat('pdf')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  exportFormat === 'pdf'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="text-left">
                    <div className="font-semibold">PDF Report</div>
                    <div className="text-sm opacity-75">Formatted report</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Data Summary */}
          <div className="bg-slate-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Export Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Total Records:</span>
                <span className="font-semibold text-slate-800 ml-2">{records.length}</span>
              </div>
              <div>
                <span className="text-slate-600">Date Range:</span>
                <span className="font-semibold text-slate-800 ml-2">
                  {new Date(Math.min(...records.map(r => new Date(r.date).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(Math.max(...records.map(r => new Date(r.date).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="text-slate-600">Average Sleep:</span>
                <span className="font-semibold text-slate-800 ml-2">
                  {(records.reduce((sum, r) => sum + r.amount, 0) / records.length).toFixed(1)}h
                </span>
              </div>
              <div>
                <span className="text-slate-600">File Size:</span>
                <span className="font-semibold text-slate-800 ml-2">
                  {exportFormat === 'csv' ? '~2-5 KB' : '~10-20 KB'}
                </span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
              isExporting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isExporting ? (
              <div className="flex items-center justify-center space-x-3">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Exporting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export {exportFormat.toUpperCase()}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExport;
