import PageMeta from '../../components/common/PageMeta';
import EndpointsLayout from '../../layout/EndpointsLayout';

export default function Endpoints() {
  return (
    <>
      <PageMeta
        title="Your Endpoints"
        description="Manage your API endpoints here."
      />
      <EndpointsLayout />
    </>
  );
}
