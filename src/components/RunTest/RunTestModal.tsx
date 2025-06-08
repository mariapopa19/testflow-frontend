import DefaultModal from '../modal/DefaultModal';
import Button from '../ui/button/Button';
import { Sparkles, Zap, Code2, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  generateTestCaseFunctionalAi,
  generateTestCaseValidationAi,
  generateTestCaseFuzzyAi,
  runTestCasesFunctional,
  runTestCasesValidation,
  runTestCasesFuzzy,
  TestCaseGenerationResponse,
} from '../../services/testRunService';
import { EndpointModel } from '../../services/endpointService';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';
import { JSX } from 'react/jsx-runtime';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  endpoint: EndpointModel | null;
};

const RunTestModal = ({ isOpen, onClose, endpoint }: Props) => {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Record<string, string>>({});

  const handleGenerate = async (type: string) => {
    if (!endpoint?.id) return; // <-- Ensure endpoint.id is defined
    try {
      setLoadingType(type);
      let result: TestCaseGenerationResponse = []; // <-- Explicitly type result
      if (type === 'functional') {
        result = await generateTestCaseFunctionalAi(endpoint.id);
      } else if (type === 'validation') {
        result = await generateTestCaseValidationAi(endpoint.id);
      } else if (type === 'fuzzy') {
        result = await generateTestCaseFuzzyAi(endpoint.id);
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
    if (!endpoint?.id) return; // <-- Ensure endpoint.id is defined
    try {
      setLoadingType(type);
      if (type === 'functional') {
        await runTestCasesFunctional(endpoint.id, true);
      } else if (type === 'validation') {
        await runTestCasesValidation(endpoint.id, true);
      } else if (type === 'fuzzy') {
        await runTestCasesFuzzy(endpoint.id, true);
      }
      showToast(toastMessages.testRun.runSuccess);
      onClose();
    } catch {
      showToast(toastMessages.testRun.runError);
    } finally {
      setLoadingType(null);
    }
  };

  const renderBlock = (type: string, title: string, icon: JSX.Element) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-4 space-y-3 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white">
      {icon}
      {title}
    </div>
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => handleGenerate(type)}
        disabled={loadingType === type}
        className="min-w-[120px]"
      >
        {loadingType === type ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          'Generate with AI'
        )}
      </Button>
      <Button
        onClick={() => handleRun(type)}
        disabled={loadingType === type}
        className="min-w-[80px]"
      >
        {loadingType === type ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          'Run'
        )}
      </Button>
    </div>
    {generated[type] && (
      <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-xs overflow-x-auto border border-gray-200 dark:border-gray-700">
        {generated[type]}
      </pre>
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
