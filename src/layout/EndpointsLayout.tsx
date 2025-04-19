import PageBreadcrumb from '../components/common/PageBreadCrumb';
import EndpointsTable from '../components/Endpoints/EndpointsTable';
import Button from '../components/ui/button/Button';

export default function EndpointsLayout() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageBreadcrumb pageTitle="Your endpoints" />
      <div className="space-y-5 sm:space-y-6">
        <EndpointsTable />
      </div>
    </div>
  );
}
