import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EndpointModel, getEndpointById } from "../../services/endpointService";
import AddEndpointForm from "./AddEndpointForm";

const EditEndpointForm = () => {
    const { id } = useParams();
    const [endpoint, setEndpoint] = useState<EndpointModel>();

    useEffect(() => {
        if (id) {
          getEndpointById(id).then((data) => {
            setEndpoint(data);
            console.log('Fetched endpoint:', data);
          });
        }
      }, [id]);

  return (
    <AddEndpointForm
    mode="edit"
    initialData={endpoint}
    // onSubmit={(data) => updateEndpoint(id, data)}
  />
  );
}

export default EditEndpointForm;