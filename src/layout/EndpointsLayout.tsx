import PageBreadcrumb from '../components/common/PageBreadCrumb';
import EndpointsTable from '../components/Endpoints/EndpointsTable';

export default function EndpointsLayout() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Your endpoints" />
      <div className="space-y-5 sm:space-y-6">
        <EndpointsTable />
      </div>
    </div>
  );
}
