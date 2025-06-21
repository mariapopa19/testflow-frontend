import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardTitle, CardDescription } from '../ui/card';
import { PassFailDistribution } from '../../services/dashboardService';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: PassFailDistribution | null;
}

const PassFailPieChart: React.FC<Props> = ({ data }) => {
    const chartData = {
        labels: ['Passed', 'Failed'],
        datasets: [
          {
            label: '# of Tests',
            data: [data?.passed ?? 0, data?.failed ?? 0],
            backgroundColor: [
              'rgba(18, 183, 106, 0.7)', // success-500
              'rgba(240, 68, 56, 0.7)',   // error-500
            ],
            borderColor: [
                'rgba(18, 183, 106, 1)',
                'rgba(240, 68, 56, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <Card>
      <div className="p-4">
        <CardTitle>Test Status Distribution</CardTitle>
        <CardDescription>Overall pass vs. fail rate.</CardDescription>
      </div>
      <div className="p-4 flex justify-center items-center h-[250px]">
        <Pie data={chartData} />
      </div>
    </Card>
  );
};

export default PassFailPieChart;