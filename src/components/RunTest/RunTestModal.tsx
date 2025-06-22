import DefaultModal from '../modal/DefaultModal';
import Button from '../ui/button/Button';
import { Sparkles, Zap, Code2, Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import {
  generateTestCaseFunctionalAi,
  generateTestCaseValidationAi,
  generateTestCaseFuzzyAi,
  runTestCasesFunctional,
  runTestCasesValidation,
  runTestCasesFuzzy,
  TestCaseGenerationResponse,
  generateTestCaseFunctional,
  generateTestCaseValidation,
  generateTestCaseFuzzy,
  TestRunResponseItem,
  TestRunResponse,
} from '../../services/testRunService';
import { EndpointModel } from '../../services/endpointService';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';
import { JSX } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import { createTestReport } from '../../services/reportService'; // Import new service

type Props = {
  isOpen: boolean;
  onClose: () => void;
  endpoint: EndpointModel | null;
};

const RunTestModal = ({ isOpen, onClose, endpoint }: Props) => {
  const navigate = useNavigate();
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Record<string, string>>({});
  const [genMode, setGenMode] = useState<'normal' | 'ai' | 'run' | null>(null);

  const handleGenerate = async (type: string, ai: boolean) => {
    if (!endpoint?.id) return;
    try {
      setGenMode(ai ? 'ai' : 'normal');
      setLoadingType(type);

      let result: TestCaseGenerationResponse = [];
      if (type === 'functional') {
        result = ai
          ? await generateTestCaseFunctionalAi(endpoint.id)
          : await generateTestCaseFunctional(endpoint.id);
      } else if (type === 'validation') {
        result = ai
          ? await generateTestCaseValidationAi(endpoint.id)
          : await generateTestCaseValidation(endpoint.id);
      } else if (type === 'fuzzy') {
        result = ai
          ? await generateTestCaseFuzzyAi(endpoint.id)
          : await generateTestCaseFuzzy(endpoint.id);
      }

      setGenerated((prev) => ({
        ...prev,
        [type]: JSON.stringify(result, null, 2),
      }));
    } catch {
      showToast(toastMessages.testRun.generateAIError);
    } finally {
      setLoadingType(null);
    }
  };

  const handleRun = async (type: string) => {
    if (!endpoint?.id) return;

    setGenMode('run');
    setLoadingType(type);

    // Declare testResults here to ensure it's in scope for the whole function
    let testResults: TestRunResponseItem[] = [];
    let response: TestRunResponse | null = null;

    try {
      // Step 1: Run the test. The result is not directly used for navigation.
      if (type === 'functional') {
        response = await runTestCasesFunctional(endpoint.id, true);
        testResults = response.results ?? [];
      } else if (type === 'validation') {
        response = await runTestCasesValidation(endpoint.id, true);
        testResults = response.results ?? [];
      } else if (type === 'fuzzy') {
        response = await runTestCasesFuzzy(endpoint.id, true);
        testResults = response.results ?? [];
      }

      console.log('Test results:', testResults);
      console.log('First result:', testResults[0]);
      // Assuming the testRunId is available in the test results
      // This part might need adjustment based on the actual API response structure
      if (!response) {
        throw new Error('No response from test run.');
      }
      const testRunId = response.testRunId;

      if (!testRunId) {
        throw new Error('testRunId not found in the test run response.');
      }

      // Step 2: Create the report using the new service
      const newReport = await createTestReport(testRunId, type);

      showToast(toastMessages.testRun.runSuccess);
      onClose(); // Close the modal immediately

      // Step 3: Navigate to the newly created report page
      navigate(`/reports/${newReport.id}`);
    } catch (error) {
      console.error('Failed to run test or find report:', error);
      showToast(toastMessages.testRun.runError);
      setLoadingType(null); // Reset loading state on error
      setGenMode(null);
    }
  };

  const renderBlock = (type: string, title: string, icon: JSX.Element) => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4 space-y-3 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white">
        {icon}
        {title}
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() => handleGenerate(type, false)}
          disabled={loadingType === type}
        >
          {loadingType === type && genMode === 'normal' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Generate Test Case'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleGenerate(type, true)}
          disabled={loadingType === type}
        >
          {loadingType === type && genMode === 'ai' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Generate with AI'
          )}
        </Button>
        <Button onClick={() => handleRun(type)} disabled={loadingType === type}>
          {loadingType === type && genMode === 'run' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Run'
          )}
        </Button>
      </div>
      {/* Secțiunea nouă care afișează testele generate */}
      {generated[type] && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Generated Test Cases (Preview)
            </h4>
            <button
              onClick={() => setGenerated((prev) => ({ ...prev, [type]: '' }))}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              aria-label="Clear preview"
            >
              <X size={16} />
            </button>
          </div>
          <div className="relative bg-gray-200 dark:bg-gray-900 p-3 rounded-lg max-h-48 overflow-y-auto custom-scrollbar">
            <pre className="text-xs whitespace-pre-wrap text-gray-800 dark:text-gray-300 font-mono">
              {generated[type]}
            </pre>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Run Tests for "${endpoint?.name}"`}
    >
      <div className="space-y-6">
        {renderBlock(
          'functional',
          'Functional Test',
          <Zap className="text-yellow-500" />,
        )}
        {renderBlock(
          'validation',
          'Validation Test',
          <Code2 className="text-purple-500" />,
        )}
        {renderBlock(
          'fuzzy',
          'Fuzzy Test',
          <Sparkles className="text-pink-500" />,
        )}
      </div>
    </DefaultModal>
  );
};

export default RunTestModal;
