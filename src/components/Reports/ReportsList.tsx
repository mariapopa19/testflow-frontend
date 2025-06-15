import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { getTestReports, deleteTestReport, TestReport } from '../../services/reportService';
import { format } from 'date-fns';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';
import SingleReportView from './SingleReportView';
import Loader from '../Loader/Loader';

export default function ReportsList() {
  const [reports, setReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isInitialMount = useRef(true); // Ref pentru a urmări montarea inițială

  useEffect(() => {
    const loadAndNavigate = async () => {
      // Se execută doar la prima randare
      if (isInitialMount.current) {
        isInitialMount.current = false;
        setLoading(true);
        try {
          const data = await getTestReports();
          setReports(data);

          const currentId = id || (data.length > 0 ? data[0].id : null);

          if (currentId && data.some(report => report.id === currentId)) {
            if (!id) {
              navigate(`/reports/${currentId}`, { replace: true });
            }
          } else if (data.length > 0) {
            navigate(`/reports/${data[0].id}`, { replace: true });
          }
          
        } catch (error) {
          console.error('Failed to load reports:', error);
          showToast(toastMessages.reports.loadError);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAndNavigate();
  }, [id, navigate]); // Dependența de `id` și `Maps` este suficientă

  const selectedReport = id ? reports.find(report => report.id === id) : reports.length > 0 ? reports[0] : null;

  const handleDelete = async (deleteId: string) => {
    try {
      await deleteTestReport(deleteId);
      showToast(toastMessages.reports.deleteSuccess);
      
      const updatedReports = reports.filter(report => report.id !== deleteId);
      setReports(updatedReports);

      if (id === deleteId) {
        if (updatedReports.length > 0) {
          navigate(`/reports/${updatedReports[0].id}`, { replace: true });
        } else {
          navigate('/reports', { replace: true });
        }
      }
    } catch (error) {
      console.error('Failed to delete report:', error);
      showToast(toastMessages.reports.deleteError);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-theme-sm overflow-y-auto max-h-[calc(100vh-150px)] custom-scrollbar">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Test Reports</h3>
        </div>
        <nav className="p-2">
          {reports.length > 0 ? (
            <ul className="space-y-1">
              {reports.map(report => (
                <li key={report.id}>
                  <Link
                    to={`/reports/${report.id}`}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center
                    ${selectedReport?.id === report.id
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/[0.12] dark:text-brand-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                      }`}
                  >
                    <div>
                      <p className="font-medium truncate">{report.testType} - {report.testRunId.substring(0, 8)}</p>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(report.createdAt), 'MMM dd, yyyy HH:mm:ss')}
                      </time>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${report.passedTests === report.totalTests
                          ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                          : 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-400'
                        }`}
                    >
                      {report.passedTests}/{report.totalTests}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 p-4">Nu există rapoarte disponibile.</p>
          )}
        </nav>
      </aside>

      <main className="col-span-12 lg:col-span-9 bg-white dark:bg-gray-800 rounded-lg shadow-theme-sm p-4 sm:p-6">
        {selectedReport ? (
          <SingleReportView key={selectedReport.id} report={selectedReport} onDelete={handleDelete} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Selectează un raport din bara laterală pentru a vedea detaliile.
          </div>
        )}
      </main>
    </div>
  );
}