import './Chart.scss';
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
import { useEffect, useState } from 'react';

// Регистрируем нужные компоненты
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: 1;
  }[];
}

interface ChartProps {
  labels: string[];
  data: number[];
}

const Chart = ({ labels, data }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Количество матчей',
        data: [],
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  });

  // 🔁 Обновляем данные только при изменении `labels` или `data`
  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data,
        },
      ],
    });
  }, [labels, data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Количество сыгранных игр',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
