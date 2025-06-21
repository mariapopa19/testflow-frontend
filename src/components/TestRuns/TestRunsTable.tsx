import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Eye, ChevronUp, ChevronDown } from 'lucide-react';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import PaginationWithIcon from '../tables/PaginationWithIcon';
import Button from '../ui/button/Button';
import Badge from '../ui/badge/Badge';
import Loader from '../Loader/Loader';
import Select from '../form/Select';
import Input from '../form/input/InputField';
import { getTestReports, TestReport } from '../../services/reportService';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';

// Extindem TestReport pentru a include câmpuri derivate pentru sortare și afișare
interface TestRunViewItem extends TestReport {
  status: 'Passed' | 'Failed';
}

type SortKey = 'testRunId' | 'createdAt' | 'status' | 'endpointName' | 'duration';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'passed' | 'failed';

export default function TestRunsTable() {
  const [testRuns, setTestRuns] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Sorting state
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filtering state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({ start: '', end: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestRuns = async () => {
      setLoading(true);
      try {
        const data = await getTestReports();
        setTestRuns(data);
      } catch (error) {
        console.error('Failed to fetch test runs:', error);
        showToast(toastMessages.reports.loadError);
      } finally {
        setLoading(false);
      }
    };
    fetchTestRuns();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    const mappedData: TestRunViewItem[] = testRuns.map(run => ({
      ...run,
      status: run.failedTests > 0 ? 'Failed' : 'Passed',
    }));
    
    let filtered = mappedData;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(run => run.status.toLowerCase() === statusFilter);
    }

    // Apply date range filter
    if (dateFilter.start && dateFilter.end) {
      try {
        const startDate = startOfDay(new Date(dateFilter.start)).getTime();
        const endDate = endOfDay(new Date(dateFilter.end)).getTime();
        filtered = filtered.filter(run => {
          const runDate = parseISO(run.createdAt).getTime();
          return runDate >= startDate && runDate <= endDate;
        });
      } catch (e) {
        console.error("Invalid date for filtering", e);
      }
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA == null && valB == null) return 0;
      if (valA == null) return sortOrder === 'asc' ? -1 : 1;
      if (valB == null) return sortOrder === 'asc' ? 1 : -1;

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [testRuns, statusFilter, dateFilter, sortKey, sortOrder]);


  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-white/[0.03] rounded-xl">
        {/* Filters and Controls */}
        <div className="flex flex-col gap-4 p-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
                {/* Status Filter */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <Select
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'passed', label: 'Passed' },
                            { value: 'failed', label: 'Failed' },
                        ]}
                        onChange={(value) => setStatusFilter(value as StatusFilter)}
                        defaultValue={statusFilter}
                    />
                </div>
                {/* Date Range Filter */}
                <div>
                     <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                    <Input type="date" value={dateFilter.start} onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))} />
                </div>
                 <div>
                     <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">End Date</label>
                    <Input type="date" value={dateFilter.end} onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))} />
                </div>
            </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <Table>
                <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        {[
                            { key: 'testRunId', label: 'Test Run ID' },
                            { key: 'createdAt', label: 'Date' },
                            { key: 'endpointName', label: 'Endpoint Name' },
                            { key: 'status', label: 'Status' },
                            { key: 'duration', label: 'Duration' },
                            { key: 'actions', label: 'Actions' },
                        ].map(({ key, label }) => (
                            <TableCell key={key} isHeader className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                <button onClick={() => handleSort(key as SortKey)} className="flex items-center gap-1 cursor-pointer focus:outline-none">
                                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">{label}</p>
                                    <div className="flex flex-col">
                                        <ChevronUp className={`size-3 ${sortKey === key && sortOrder === 'asc' ? 'text-brand-500' : ''}`} />
                                        <ChevronDown className={`size-3 ${sortKey === key && sortOrder === 'desc' ? 'text-brand-500' : ''}`} />
                                    </div>
                                </button>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((run) => (
                        <TableRow key={run.id}>
                            <TableCell className="px-4 py-3 font-mono text-xs border border-gray-100 dark:border-white/[0.05] whitespace-nowrap dark:text-gray-400/90">{run.testRunId.substring(0, 8)}...</TableCell>
                            <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap dark:text-gray-400/90">{format(parseISO(run.createdAt), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                            <TableCell className="px-4 py-3 italic border border-gray-100 dark:border-white/[0.05] whitespace-nowrap text-gray-400 dark:text-gray-400/90">{run.endpointName}</TableCell>
                            <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                                {run.status === 'Failed' ? (
                                    <Badge variant="solid" color="error" size="sm">Failed</Badge>
                                ) : (
                                    <Badge variant="solid" color="success" size="sm">Passed</Badge>
                                )}
                            </TableCell>
                            <TableCell className="px-4 py-3 italic border border-gray-100 dark:border-white/[0.05] whitespace-nowrap text-gray-400">{run.duration}</TableCell>
                            <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                                <Button size="sm" variant="outline" onClick={() => navigate(`/reports/${run.id}`)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Results
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        
        {/* Pagination */}
        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing {totalItems > 0 ? startIndex + 1 : 0} to {endIndex} of {totalItems} entries
                    </p>
                </div>
                <PaginationWithIcon
                    totalPages={totalPages}
                    initialPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    </div>
  );
}