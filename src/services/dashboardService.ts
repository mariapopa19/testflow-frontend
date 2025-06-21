import api from './api';
import { TestReport } from './reportService';

export interface DashboardStats {
  totalEndpoints: number;
  totalTestRuns: number;
  passedTestsPercentage: number;
  failedTestsPercentage: number;
}

export interface TestRunsOverTime {
  date: string;
  count: number;
}

export interface PassFailDistribution {
  passed: number;
  failed: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Mock API call
  const response = await api.get<DashboardStats>('/api/dashboard/stats');
  return response.data;
};

export const getTestRunsOverTime = async (): Promise<TestRunsOverTime[]> => {
  const response = await api.get<TestRunsOverTime[]>(
    '/api/dashboard/test-runs-over-time',
  );
  return response.data;
};

export const getPassFailDistribution =
  async (): Promise<PassFailDistribution> => {
    const response = await api.get<PassFailDistribution>(
      '/api/dashboard/pass-fail-distribution',
    );
    return response.data;
  };

export const getRecentTestRuns = async (limit = 5): Promise<TestReport[]> => {
  const response = await api.get<TestReport[]>(
    `/api/reports/recent?limit=${limit}`,
  );
  return response.data;
};
