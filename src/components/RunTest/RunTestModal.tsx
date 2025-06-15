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
  generateTestCaseFunctional,
  generateTestCaseValidation,
  generateTestCaseFuzzy,
} from '../../services/testRunService';
import { EndpointModel } from '../../services/endpointService';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';
import { JSX } from 'react/jsx-runtime';
import { useNavigate } from 'react-router';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  endpoint: EndpointModel | null;
};

const RunTestModal = ({ isOpen, onClose, endpoint }: Props) => {
  const navigate = useNavigate();
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Record<string, string>>({});
  const [genMode, setGenMode] = useState<'normal' | 'ai' | 'run' | null>(null)

  const handleGenerate = async (type: string, ai: boolean) => {
    if (!endpoint?.id) return; // <-- Ensure endpoint.id is defined
    try {
      setGenMode(ai ? 'ai' : 'normal')
      setLoadingType(type)
  
      let result: TestCaseGenerationResponse = []
      if (type === 'functional') {
        result = ai
          ? await generateTestCaseFunctionalAi(endpoint.id)
          : await generateTestCaseFunctional(endpoint.id)
      } else if (type === 'validation') {
        result = ai
          ? await generateTestCaseValidationAi(endpoint.id)
          : await generateTestCaseValidation(endpoint.id)
      } else if (type === 'fuzzy') {
        result = ai
          ? await generateTestCaseFuzzyAi(endpoint.id)
          : await generateTestCaseFuzzy(endpoint.id)
      }
  
      setGenerated((prev) => ({ ...prev, [type]: JSON.stringify(result, null, 2) }))
    } catch {
      showToast(toastMessages.testRun.generateAIError);
    } finally {
      setLoadingType(null);
    }
  };

  const handleRun = async (type: string) => {
    if (!endpoint?.id) return;
    try {
      setGenMode('run');
      setLoadingType(type);
      let result;
      
      if (type === 'functional') {
        result = await runTestCasesFunctional(endpoint.id, true);
      } else if (type === 'validation') {
        result = await runTestCasesValidation(endpoint.id, true);
      } else if (type === 'fuzzy') {
        result = await runTestCasesFuzzy(endpoint.id, true);
      }

      showToast(toastMessages.testRun.runSuccess);
      onClose();
      console.log('Test run result:', result);
      // if (!result || !result.id) {
      //   // Handle case where result is not valid
      //   showToast(toastMessages.testRun.runError);
      //   return;
      // }
      // Navigate to the report page with the test results
      // navigate(`/reports/${result.map(r => r.id).join(',')}`, {
      //   state: {
      //     reportData: result,
      //     fromTest: true,
      //     testType: type,
      //     endpointName: endpoint.name 
      //   } 
      // });
    } catch (error) {
      showToast(toastMessages.testRun.runError);
    } finally {
      setLoadingType(null);
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
        {loadingType === type && genMode === 'normal' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Test Case'}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleGenerate(type, true)}
        disabled={loadingType === type}
      >
        {loadingType === type && genMode === 'ai' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate with AI'}
      </Button>
      <Button
        onClick={() => handleRun(type)}
        disabled={loadingType === type}
      >
        {loadingType === type && genMode === 'run' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Run'}
      </Button>
    </div>
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
