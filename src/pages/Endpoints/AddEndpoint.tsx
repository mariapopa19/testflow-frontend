import PageMeta from '../../components/common/PageMeta';
import AddEndpointForm from '../../components/Endpoints/AddEndpointForm';

export default function AddEndpoint() {
  return (
    <>
      <PageMeta
        title="Add Endpoint Form"
        description="This is React.js Data Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AddEndpointForm  />
    </>
  );
}