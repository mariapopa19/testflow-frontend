import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import { getDashboardStats, DashboardStats, getTestRunsOverTime, TestRunsOverTime, getPassFailDistribution, PassFailDistribution } from '../services/dashboardService';
import { TestReport, getTestReports } from '../services/reportService';
import { FiBox, FiPlayCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

// Import chart components you will create next
import TestRunsOverTimeChart from '../components/Dashboard/TestRunsOverTimeChart';
import PassFailPieChart from '../components/Dashboard/PassFailPieChart';
import RecentTestRunsTable from '../components/Dashboard/RecentTestRunsTable';
import Loader from '../components/Loader/Loader';

// Stat Card Component
const StatCard = ({ title, value, icon, subtext }: { title: string, value: string | number, icon: React.ReactNode, subtext?: string }) => (
    <Card>
        <div className="flex items-center p-4">
            <div className="p-3 mr-4 text-white bg-brand-500 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
                 {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
            </div>
        </div>
    </Card>
);


export default function DashboardLayout() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [chartData, setChartData] = useState<TestRunsOverTime[]>([]);
    const [pieData, setPieData] = useState<PassFailDistribution | null>(null);
    const [recentRuns, setRecentRuns] = useState<TestReport[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, runsOverTime, passFail, reports] = await Promise.all([
                    getDashboardStats(),
                    getTestRunsOverTime(),
                    getPassFailDistribution(),
                    getTestReports()
                ]);

                setStats(statsData);
                setChartData(runsOverTime);
                setPieData(passFail);
                // Get the 5 most recent reports
                setRecentRuns(reports.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageBreadcrumb pageTitle="Dashboard" />
      <div className="space-y-6">
        {/* First Row: Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Endpoints" value={stats?.totalEndpoints ?? 0} icon={<FiBox size={24} />} />
            <StatCard title="Total Test Runs" value={stats?.totalTestRuns ?? 0} icon={<FiPlayCircle size={24} />} />
            <StatCard title="Passed Tests" value={`${stats?.passedTestsPercentage ?? 0}%`} icon={<FiCheckCircle size={24} />} />
            <StatCard title="Failed Tests" value={`${stats?.failedTestsPercentage ?? 0}%`} icon={<FiXCircle size={24} />} />
        </div>

        {/* Second Row: Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <TestRunsOverTimeChart data={chartData} />
            </div>
            <div className="lg:col-span-2">
                <PassFailPieChart data={pieData} />
            </div>
        </div>

        {/* Third Row: Recent Test Runs Table */}
        <div>
            <RecentTestRunsTable data={recentRuns} />
        </div>
      </div>
    </div>
  );
}