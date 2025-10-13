'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for a record
interface Record {
  date: string; // ISO date string
  amount: number; // Hours slept
}

const BarChart = ({ records }: { records: Record[] }) => {
  if (!records || records.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-slate-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data to display</p>
        </div>
      </div>
    );
  }
  
  // Prepare data for the chart
  const data = {
    labels: records.map((record) => new Date(record.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })), // Use record dates as labels
    datasets: [
      {
        data: records.map((record) => record.amount), // Use record amounts as data
        backgroundColor: records.map((record) => {
          if (record.amount < 6) return 'rgba(239, 68, 68, 0.3)'; // Red for poor sleep
          if (record.amount < 7) return 'rgba(245, 158, 11, 0.3)'; // Orange for fair sleep
          if (record.amount < 8) return 'rgba(34, 197, 94, 0.3)'; // Green for good sleep
          return 'rgba(59, 130, 246, 0.3)'; // Blue for excellent sleep
        }),
        borderColor: records.map((record) => {
          if (record.amount < 6) return 'rgba(239, 68, 68, 1)';
          if (record.amount < 7) return 'rgba(245, 158, 11, 1)';
          if (record.amount < 8) return 'rgba(34, 197, 94, 1)';
          return 'rgba(59, 130, 246, 1)';
        }),
        borderWidth: 2,
        borderRadius: 8, // More rounded bar edges
        borderSkipped: false,
        hoverBackgroundColor: records.map((record) => {
          if (record.amount < 6) return 'rgba(239, 68, 68, 0.5)';
          if (record.amount < 7) return 'rgba(245, 158, 11, 0.5)';
          if (record.amount < 8) return 'rgba(34, 197, 94, 0.5)';
          return 'rgba(59, 130, 246, 0.5)';
        }),
        hoverBorderColor: records.map((record) => {
          if (record.amount < 6) return 'rgba(239, 68, 68, 1)';
          if (record.amount < 7) return 'rgba(245, 158, 11, 1)';
          if (record.amount < 8) return 'rgba(34, 197, 94, 1)';
          return 'rgba(59, 130, 246, 1)';
        }),
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false, // Remove legend
      },
      title: {
        display: false, // Remove chart title
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: '600' as const,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return `Sleep Record - ${context[0].label}`;
          },
          label: function(context: any) {
            const hours = context.parsed.y;
            let quality = '';
            if (hours < 6) quality = 'Poor';
            else if (hours < 7) quality = 'Fair';
            else if (hours < 8) quality = 'Good';
            else quality = 'Excellent';
            return `${hours} hours (${quality})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: '600' as const,
          },
          color: '#475569',
        },
        ticks: {
          font: {
            size: 12,
            weight: '500' as const,
          },
          color: '#64748b',
          maxRotation: 45,
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
        border: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Hours Slept',
          font: {
            size: 14,
            weight: '600' as const,
          },
          color: '#475569',
        },
        ticks: {
          font: {
            size: 12,
            weight: '500' as const,
          },
          color: '#64748b',
          stepSize: 1,
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          lineWidth: 1,
        },
        border: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 12,
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
