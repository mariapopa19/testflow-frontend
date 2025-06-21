import PageMeta from '../../components/common/PageMeta';
import DashboardLayout from '../../layout/DashboardLayout';

export default function Dashboard() {
  return (
    <>
      <PageMeta
        title="Dashboard | TestFlow"
        description="An overview of your testing metrics."
      />
      <DashboardLayout />
    </>
  );
}