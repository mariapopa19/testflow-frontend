import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardTitle, CardDescription } from '../ui/card';
import { TestRunsOverTime } from '../../services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  data: TestRunsOverTime[];
}

const TestRunsOverTimeChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Test Runs',
        data: data.map(d => d.count),
        borderColor: '#465fff',
        backgroundColor: 'rgba(70, 95, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card>
        <div className="p-4">
            <CardTitle>Test Runs Over Time</CardTitle>
            <CardDescription>Number of tests run in the last 7 days.</CardDescription>
        </div>
      <div className="p-4">
        <Line options={options} data={chartData} />
      </div>
    </Card>
  );
};

export default TestRunsOverTimeChart;