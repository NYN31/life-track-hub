import React from 'react';
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
import { IBlogStats } from '../../types/blog';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BlogStatsGraph: React.FC<IBlogStats> = ({ statusCounts }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we're using single dataset
      },
      title: {
        display: true,
        text: 'Blog Status Distribution',
        font: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: 'bold' as const,
        },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `Count: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 11,
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Number of Blogs',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
            weight: 'bold' as const,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const colors = {
    PUBLIC: { border: '#22c55e', background: 'rgba(34, 197, 94, 0.8)' },
    PRIVATE: { border: '#eab308', background: 'rgba(234, 179, 8, 0.8)' },
    DELETED: { border: '#ef4444', background: 'rgba(239, 68, 68, 0.8)' },
    DRAFT: { border: '#6b7280', background: 'rgba(107, 114, 128, 0.8)' },
  };

  const chartData = {
    labels: statusCounts.map(item => item.status),
    datasets: [
      {
        data: statusCounts.map(item => item.count),
        backgroundColor: statusCounts.map(
          item => colors[item.status as keyof typeof colors].background
        ),
        borderColor: statusCounts.map(
          item => colors[item.status as keyof typeof colors].border
        ),
        borderWidth: 1,
        borderRadius: 8,
        maxBarThickness: 60,
      },
    ],
  };

  return (
    <section className="space-y-8 common-box animate-fade-in w-full sm:w-[90%] md:w-[80%] xl:w-[50%] mx-auto">
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <Bar options={options} data={chartData} />
      </div>
    </section>
  );
};

export default BlogStatsGraph;
