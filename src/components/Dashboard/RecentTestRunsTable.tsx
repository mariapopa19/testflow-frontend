import { TestReport } from '../../services/reportService';
import { format } from 'date-fns';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import { Card, CardTitle, CardDescription } from '../ui/card';
import Badge from '../ui/badge/Badge';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/button/Button';
import { Eye } from 'lucide-react';

interface Props {
  data: TestReport[];
}

const RecentTestRunsTable: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const parseTimeSpanToMs = (timeSpan: string): number => {
    const parts = timeSpan.split(':');
    if (parts.length !== 3) return 0;

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    const firstPart = parts[0];
    if (firstPart.includes('.')) {
      const daysParts = firstPart.split('.');
      const days = parseInt(daysParts[0], 10) || 0;
      hours = parseInt(daysParts[1], 10) || 0;
      hours += days * 24;
    } else {
      hours = parseInt(firstPart, 10) || 0;
    }

    minutes = parseInt(parts[1], 10) || 0;
    seconds = parseFloat(parts[2]) || 0;

    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };


  const formatDuration = (duration: string | number): string => {
    let ms: number;

    if (typeof duration === 'string') {
      ms = parseTimeSpanToMs(duration);
    } else {
      ms = duration;
    }

    if (ms === 0) return '0 ms';
    if (ms < 1000) {
      return `${Math.round(ms)} ms`;
    }
    return `${(ms / 1000).toFixed(2)} s`;
  };

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <CardTitle>Recent Test Runs</CardTitle>
        <CardDescription>A summary of the latest tests executed.</CardDescription>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-700 text-theme-xs dark:text-gray-400">Endpoint</TableCell>
              <TableCell isHeader className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-700 text-theme-xs dark:text-gray-400">Status</TableCell>
              <TableCell isHeader className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-700 text-theme-xs dark:text-gray-400">Duration</TableCell>
              <TableCell isHeader className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-700 text-theme-xs dark:text-gray-400">Date</TableCell>
              <TableCell isHeader className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-700 text-theme-xs dark:text-gray-400 text-center">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.05] text-theme-sm text-gray-800 dark:text-white/90 text-center">{run.endpointName}</TableCell>
                  <TableCell className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.05] text-center">
                    {run.failedTests > 0 ? (
                      <Badge variant="light" color="error" size="sm">Failed</Badge>
                    ) : (
                      <Badge variant="light" color="success" size="sm">Passed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.05] text-theme-sm text-gray-500 dark:text-gray-400 text-center">{run.duration ? formatDuration(run.duration) : 'N/A'}</TableCell>
                  <TableCell className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.05] text-theme-sm text-gray-500 dark:text-gray-400 text-center">{format(new Date(run.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.05] text-center">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/reports/${run.id}`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="py-10 text-center text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/[0.05]">
                  No recent test runs to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default RecentTestRunsTable;