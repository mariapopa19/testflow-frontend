import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ReportsList from '../components/Reports/ReportsList';

export default function ReportsLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <PageBreadcrumb pageTitle="Test Reports" />
        <div className="mt-4">
          <ReportsList />
        </div>
      </div>
    </div>
  );
}