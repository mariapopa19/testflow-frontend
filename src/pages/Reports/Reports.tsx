import PageMeta from '../../components/common/PageMeta';
import ReportsList from '../../components/Reports/ReportsList';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function Reports() {
  return (
    <>
      <PageMeta
        title="Test Reports"
        description="View detailed test execution reports"
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <PageBreadcrumb pageTitle="Test Reports" />
        <ReportsList />
      </div>
    </>
  );
}