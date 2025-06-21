import api from './api';
import { TestReport } from './reportService';

// Interface for the main dashboard statistics
export interface DashboardStats {
  totalEndpoints: number;
  totalTestRuns: number;
  passedTestsPercentage: number;
  failedTestsPercentage: number;
}

// Interface for the test runs over time data
export interface TestRunsOverTime {
  date: string;
  count: number;
}

// Interface for the pass/fail distribution
export interface PassFailDistribution {
  passed: number;
  failed: number;
}

/**
 * Fetches the main dashboard statistics.
 * In a real application, this would make an API call.
 * For now, it returns mock data.
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Mock API call
  // const response = await api.get<DashboardStats>('/api/dashboard/stats');
  // return response.data;
  
  // Returning mock data for demonstration
  return Promise.resolve({
    totalEndpoints: 27,
    totalTestRuns: 153,
    passedTestsPercentage: 88.2,
    failedTestsPercentage: 11.8,
  });
};

/**
 * Fetches data for the "Test runs over time" chart.
 * Returns mock data for the last 7 days.
 */
export const getTestRunsOverTime = async (): Promise<TestRunsOverTime[]> => {
  // Returning mock data for demonstration
  return Promise.resolve([
    { date: '2024-06-15', count: 15 },
    { date: '2024-06-16', count: 22 },
    { date: '2024-06-17', count: 18 },
    { date: '2024-06-18', count: 25 },
    { date: '2024-06-19', count: 30 },
    { date: '2024-06-20', count: 28 },
    { date: '2024-06-21', count: 35 },
  ]);
};

/**
 * Fetches data for the pass/fail distribution pie chart.
 */
export const getPassFailDistribution = async (): Promise<PassFailDistribution> => {
  // Returning mock data
  return Promise.resolve({
    passed: 135,
    failed: 18,
  });
};

/**
 * Fetches the most recent test runs.
 * This can reuse the existing report service.
 */
export const getRecentTestRuns = async (limit = 5): Promise<TestReport[]> => {
    // In a real app, you might have a dedicated endpoint:
    // const response = await api.get<TestReport[]>(`/api/reports/recent?limit=${limit}`);
    // return response.data;

    // For now, we'll just mock a few recent reports.
    return Promise.resolve([
        // ... mock TestReport objects here if needed
    ]);
};