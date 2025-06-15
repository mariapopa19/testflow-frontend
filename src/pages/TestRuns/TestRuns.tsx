import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import TestRunsTable from '../../components/TestRuns/TestRunsTable';

export default function TestRuns() {
  return (
    <>
      <PageMeta
        title="Test History"
        description="View the history of all test runs."
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <PageBreadcrumb pageTitle="Test History" />
        <div className="mt-4">
          <TestRunsTable />
        </div>
      </div>
    </>
  );
}
