import api from './api';

export interface TestCaseGenerationItem {
  type: string;
  input: string;
  expectedStatusCode: number[];
  expectedResponse: string;
}

export type TestCaseGenerationResponse = TestCaseGenerationItem[];

export interface TestRunResponseItem {
  id: string;
  testCaseType: string;
  input: string;
  expectedStatusCode: number[];
  actualStatusCode: number;
  passed: boolean;
  responseBody: string;
  duration: number;
  calledUrl: string;
}

export interface TestRunResponse {
  testRunId: string;
  results: TestRunResponseItem[];
}

export const generateTestCaseValidation = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/validation/${endpointId}`,
  );
  return response.data;
};

export const generateTestCaseValidationAi = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/validation/ai/${endpointId}`,
  );
  return response.data;
};

export const runTestCasesValidation = async (
  endpointId: string,
  artificialIntelligence: boolean,
): Promise<TestRunResponse> => {
  const response = await api.post<TestRunResponse>(
    '/api/test-generator/validation/run',
    { endpointId, artificialIntelligence },
  );
  return response.data;
};

export const generateTestCaseFuzzy = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/fuzzy/${endpointId}`,
  );
  return response.data;
};

export const generateTestCaseFuzzyAi = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/fuzzy/ai/${endpointId}`,
  );
  return response.data;
};

export const runTestCasesFuzzy = async (
  endpointId: string,
  artificialIntelligence: boolean,
): Promise<TestRunResponse> => {
  const response = await api.post<TestRunResponse>(
    '/api/test-generator/fuzzy/run',
    { endpointId, artificialIntelligence },
  );
  return response.data;
};

export const generateTestCaseFunctional = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/functional/${endpointId}`,
  );
  return response.data;
};

export const generateTestCaseFunctionalAi = async (
  endpointId: string,
): Promise<TestCaseGenerationResponse> => {
  const response = await api.get<TestCaseGenerationResponse>(
    `/api/test-generator/functional/ai/${endpointId}`,
  );
  return response.data;
};

export const runTestCasesFunctional = async (
  endpointId: string,
  artificialIntelligence: boolean,
): Promise<TestRunResponse> => {
  const response = await api.post<TestRunResponse>(
    '/api/test-generator/functional/run',
    { endpointId, artificialIntelligence },
  );
  return response.data;
};