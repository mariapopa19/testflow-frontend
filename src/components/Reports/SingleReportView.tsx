import { useState } from 'react';
import { Card, CardTitle } from '../ui/card';
import Button from '../ui/button/Button';
import { ChevronDown, ChevronUp, Download, Trash2 } from 'lucide-react';
import { TestReport } from '../../services/reportService';
import { format } from 'date-fns';
import JsonPreviewCell from '../Endpoints/JsonPreviewCell';

interface SingleReportViewProps {
  report: TestReport;
  onDelete: (id: string) => void;
}

export default function SingleReportView({
  report,
  onDelete,
}: SingleReportViewProps) {
  const [openSections, setOpenSections] = useState<string[]>([
    'summary',
    'results',
  ]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleDownloadPdf = () => {
    alert('PDF download functionality not yet implemented.');
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Test Report for: {report.endpointName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Test Type: {report.testType} | Generated on{' '}
            {format(new Date(report.createdAt), 'MMM dd, yyyy HH:mm:ss')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleDownloadPdf}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            size="sm"
            variant="primary"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => onDelete(report.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Report
          </Button>
        </div>
      </header>

      {/* Summary Card */}
      <Card>
        <header
          className="flex justify-between items-center cursor-pointer p-4 sm:p-6"
          onClick={() => toggleSection('summary')}
        >
          <CardTitle>Summary</CardTitle>
          {openSections.includes('summary') ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </header>

        {openSections.includes('summary') && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800">
            <article className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {report.totalTests}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Total Tests
              </p>
            </article>
            <article className="text-center p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-100 dark:border-success-800">
              <p className="text-3xl font-bold text-success-600">
                {report.passedTests}
              </p>
              <p className="text-success-600 text-sm">Passed</p>
            </article>
            <article className="text-center p-4 bg-error-50 dark:bg-error-900/20 rounded-lg border border-error-100 dark:border-error-800">
              <p className="text-3xl font-bold text-error-600">
                {report.failedTests}
              </p>
              <p className="text-error-600 text-sm">Failed</p>
            </article>
          </section>
        )}
      </Card>

      {/* Test Results Card */}
      <Card>
        <header
          className="flex justify-between items-center cursor-pointer p-4 sm:p-6"
          onClick={() => toggleSection('results')}
        >
          <CardTitle>Test Results</CardTitle>
          {openSections.includes('results') ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </header>

        {openSections.includes('results') && (
          <section className="mt-4 space-y-4 p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 max-h-[45vh] overflow-y-auto custom-scrollbar">
            {report.results.map((result, index) => (
              <article
                key={`${report.id}-result-${index}`}
                className={`rounded-lg p-4 border ${result.passed ? 'border-success-300 dark:border-success-800 bg-success-50 dark:bg-success-900/10' : 'border-error-300 dark:border-error-800 bg-error-50 dark:bg-error-900/10'}`}
              >
                <header className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-medium text-lg ${result.passed ? 'text-success-700 dark:text-success-400' : 'text-error-700 dark:text-error-400'}`}
                  >
                    Test Case: {result.testCaseType}{' '}
                    {result.passed ? '✅ Passed' : '❌ Failed'}
                  </h4>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${result.passed ? 'bg-success-200 text-success-800 dark:bg-success-700/50 dark:text-success-200' : 'bg-error-200 text-error-800 dark:bg-error-700/50 dark:text-error-200'}`}
                  >
                    Status: {result.actualStatusCode} (Expected:{' '}
                    {Array.isArray(result.expectedStatusCode)
                      ? result.expectedStatusCode.join(', ')
                      : 'N/A'}
                    )
                  </span>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Request Input
                    </h5>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 text-sm overflow-auto max-h-40 dark:text-gray-300/90">
                      <JsonPreviewCell value={result.input} lineShown={5} />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Actual Response Body
                    </h5>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 text-sm overflow-auto max-h-40 dark:text-gray-300/90">
                      <JsonPreviewCell
                        value={result.responseBody}
                        lineShown={5}
                      />
                    </div>
                  </div>
                </div>
                {/* Secțiunea nouă pentru URL */}
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Endpoint URL
                  </h5>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 text-sm font-mono text-gray-500 dark:text-gray-400 break-all">
                    {result.calledUrl}
                  </div>
                </div>

                {/* Optional: Display assertion details or errors */}
                {!result.passed && (
                  <div className="mt-4 p-3 bg-error-100 dark:bg-error-900/20 rounded-lg text-error-700 dark:text-error-400">
                    <h5 className="font-medium text-sm mb-1">
                      Errors/Details:
                    </h5>
                    {/* Linia 128: Aplică aceeași verificare aici */}
                    <p>
                      Expected status code(s):{' '}
                      {Array.isArray(result.expectedStatusCode)
                        ? result.expectedStatusCode.join(', ')
                        : 'N/A'}
                      . Actual: {result.actualStatusCode}.
                    </p>
                    {/* Add more detailed error messages if available in your TestRunResponseItem */}
                  </div>
                )}
              </article>
            ))}
            {report.results.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 p-4">
                No test results available for this report.
              </p>
            )}
          </section>
        )}
      </Card>
    </div>
  );
}
