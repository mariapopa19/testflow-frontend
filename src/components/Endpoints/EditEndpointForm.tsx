import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EndpointModel, getEndpointById, updateEndpoint } from "../../services/endpointService";
import AddEndpointForm from "./AddEndpointForm";

const EditEndpointForm = () => {
    const { id } = useParams();
    const [endpoint, setEndpoint] = useState<EndpointModel>();

    const updateEndpointForm = async (data: EndpointModel) => {
        try {
            if (!id) {
                throw new Error("ID is undefined");
            }
            const updatedEndpoint = await updateEndpoint(id, data);
            setEndpoint(updatedEndpoint);
            console.log('Updated endpoint:', updatedEndpoint);
        } catch (error) {
            console.error('Error updating endpoint:', error);
        }
    }

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
    onSubmit={(data: EndpointModel) => updateEndpointForm(data)}
  />
  );
}

export default EditEndpointForm;