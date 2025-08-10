import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HourlyForecast = ({ data }) => {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map((d) => d.hour),
    datasets: [
      {
        label: 'Temperature',
        data: data.map((d) => d.temp),
        borderColor: '#ffb36c',
        backgroundColor: '#ffb36c',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ffb36c',
        pointHoverBorderColor: 'white',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Hourly forecast',
        align: 'start',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#374151',
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#b5b5b5',
          borderWidth: 1,
        },
        ticks: {
          color: '#000',
          font: {
            size: 11,
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          color: '#b5b5b5',
          borderWidth: 1,
        },
        ticks: {
          color: '#000',
          callback: (value) => value + '°C',
          font: {
            size: 11,
            weight: '500',
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#e8e8e8] p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-7xl mx-auto 
                 xl:w-[1200px] xl:h-[488px] xl:max-w-none xl:ml-[-150px]">
      <div className="relative w-full aspect-[16/10] xl:aspect-auto xl:h-full">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default HourlyForecast;
