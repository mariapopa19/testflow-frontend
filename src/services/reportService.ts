import api from './api';
import { TestRunResponseItem } from '../services/testRunService';

export interface TestReport {
  id: string;
  testRunId: string;
  testType: string;
  createdAt: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestRunResponseItem[];
}

export const createTestReport = async (
  testRunId: string,
  testType: string): Promise<TestReport> => {
  const response = await api.post<TestReport>('/api/test-reports', { 
    testRunId,
    testType
  });
  return response.data;
};

export const getTestReports = async (): Promise<TestReport[]> => {
  const response = await api.get<TestReport[]>('/api/test-reports');
  return response.data;
};

export const getTestReport = async (id: string): Promise<TestReport> => {
  const response = await api.get<TestReport>(`/api/test-reports/${id}`);
  return response.data;
};

export const deleteTestReport = async (id: string): Promise<void> => {
  await api.delete(`/api/test-reports/${id}`);
};