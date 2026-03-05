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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { Record } from '@/types/Record';

const BarChart = ({ records }: { records: Record[] }) => {
  if (!records || records.length === 0) {
    return (
      <div className='flex items-center justify-center h-full text-slate-400'>
        <p className='text-sm'>No data to display</p>
      </div>
    );
  }

  const getColor = (amount: number) => {
    if (amount < 6) return { bg: 'rgba(15,23,42,0.15)', border: 'rgba(15,23,42,0.5)', hover: 'rgba(15,23,42,0.3)' };
    if (amount < 7) return { bg: 'rgba(15,23,42,0.3)', border: 'rgba(15,23,42,0.65)', hover: 'rgba(15,23,42,0.45)' };
    if (amount < 8) return { bg: 'rgba(15,23,42,0.55)', border: 'rgba(15,23,42,0.8)', hover: 'rgba(15,23,42,0.65)' };
    return { bg: 'rgba(15,23,42,0.85)', border: 'rgba(15,23,42,1)', hover: 'rgba(15,23,42,0.95)' };
  };

  const data = {
    labels: records.map((record) => {
      const date = new Date(record.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        data: records.map((r) => r.amount),
        backgroundColor: records.map((r) => getColor(r.amount).bg),
        borderColor: records.map((r) => getColor(r.amount).border),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: records.map((r) => getColor(r.amount).hover),
        hoverBorderColor: records.map((r) => getColor(r.amount).border),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 600,
      easing: 'easeOutQuart' as const,
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        borderColor: '#1e293b',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        titleFont: { size: 12, weight: 600 as const },
        bodyFont: { size: 12, weight: 400 as const },
        padding: 10,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: (items: any[]) => items[0].label,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) => {
            const h = ctx.parsed.y;
            const q = h < 6 ? 'Poor' : h < 7 ? 'Fair' : h < 8 ? 'Good' : 'Excellent';
            return `${h}h — ${q}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 11 }, color: '#94a3b8' },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { font: { size: 11 }, color: '#94a3b8', stepSize: 2 },
        grid: { color: 'rgba(148,163,184,0.08)' },
        border: { display: false },
        suggestedMin: 0,
        suggestedMax: 12,
        beginAtZero: true,
      },
    },
    interaction: { intersect: false, mode: 'index' as const },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
