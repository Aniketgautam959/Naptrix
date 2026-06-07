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
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Record } from '@/types/Record';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ records }: { records: Record[] }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  if (!records || records.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <p className="text-sm">No data</p>
      </div>
    );
  }

  const getColor = (amount: number) => {
    if (isDark) {
      if (amount < 6)
        return {
          bg: 'rgba(148,163,184,0.2)',
          border: 'rgba(148,163,184,0.4)',
          hover: 'rgba(148,163,184,0.3)',
        };
      if (amount < 7)
        return {
          bg: 'rgba(96,165,250,0.35)',
          border: 'rgba(96,165,250,0.6)',
          hover: 'rgba(96,165,250,0.45)',
        };
      if (amount < 8)
        return {
          bg: 'rgba(52,211,153,0.4)',
          border: 'rgba(52,211,153,0.65)',
          hover: 'rgba(52,211,153,0.5)',
        };
      return {
        bg: 'rgba(52,211,153,0.7)',
        border: 'rgba(52,211,153,0.9)',
        hover: 'rgba(52,211,153,0.8)',
      };
    }
    if (amount < 6)
      return {
        bg: 'rgba(15,23,42,0.12)',
        border: 'rgba(15,23,42,0.4)',
        hover: 'rgba(15,23,42,0.25)',
      };
    if (amount < 7)
      return {
        bg: 'rgba(15,23,42,0.25)',
        border: 'rgba(15,23,42,0.55)',
        hover: 'rgba(15,23,42,0.35)',
      };
    if (amount < 8)
      return {
        bg: 'rgba(15,23,42,0.45)',
        border: 'rgba(15,23,42,0.7)',
        hover: 'rgba(15,23,42,0.55)',
      };
    return {
      bg: 'rgba(15,23,42,0.8)',
      border: 'rgba(15,23,42,1)',
      hover: 'rgba(15,23,42,0.9)',
    };
  };

  const tickColor = isDark ? '#64748b' : '#94a3b8';
  const gridColor = isDark
    ? 'rgba(100,116,139,0.12)'
    : 'rgba(148,163,184,0.08)';

  const data = {
    labels: records.map(r =>
      new Date(r.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        data: records.map(r => r.amount),
        backgroundColor: records.map(r => getColor(r.amount).bg),
        borderColor: records.map(r => getColor(r.amount).border),
        borderWidth: 1,
        borderRadius: 3,
        borderSkipped: false,
        hoverBackgroundColor: records.map(r => getColor(r.amount).hover),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: isDark ? '#334155' : '#1e293b',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        padding: 8,
        titleFont: { size: 11 },
        bodyFont: { size: 11 },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: (ctx: any) => {
          const h = ctx.parsed.y;
          const q =
            h < 6 ? 'Poor' : h < 7 ? 'Fair' : h < 8 ? 'Good' : 'Excellent';
          return `${h}h — ${q}`;
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, color: tickColor },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { font: { size: 10 }, color: tickColor, stepSize: 2 },
        grid: { color: gridColor },
        border: { display: false },
        suggestedMax: 12,
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
