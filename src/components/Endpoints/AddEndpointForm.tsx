import { useEffect, useState } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import Form from '../form/Form';
import Button from '../ui/button/Button';
import TextArea from '../form/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { addEndpoint, EndpointModel } from '../../services/endpointService';
import { showToast } from '../../utils/toastHelper';
import toastMessages from '../../constants/toastMessages';

interface AddEndpointFormProps {
  mode?: 'create' | 'edit';
  initialData?: EndpointModel;
  onSubmit?: (data: EndpointModel) => void;
}

const AddEndpointForm: React.FC<AddEndpointFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('GET');
  const [endpointName, setEndpointName] = useState<string>(
    initialData?.name ?? '',
  );
  const [endpointUrl, setEndpointUrl] = useState<string>(
    initialData?.url ?? '',
  );
  const [requestBody, setRequestBody] = useState<string>(
    initialData?.requestBodyModel ?? '',
  );
  const [responseBody, setResponseBody] = useState<string>(
    initialData?.responseBodyModel ?? '',
  );

  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<boolean>(false);
  const [errorUrl, setErrorUrl] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/endpoints');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'create'){
    let requestJson: string = '';
    let responseJson: string = '';
    if (requestBody !== '') {
      requestJson = JSON.stringify(JSON.parse(requestBody));
    }
    if (responseBody !== '') {
      responseJson = JSON.stringify(JSON.parse(responseBody));
    }


    try {
      await addEndpoint({
        name: endpointName,
        httpMethod: selectedOption,
        url: endpointUrl,
        requestBodyModel: requestJson,
        responseBodyModel: responseJson,
      });
      navigate('/endpoints');
      showToast(toastMessages.endpoint.createSuccess);
    } catch (error) {
      showToast(toastMessages.endpoint.createError);
      console.error('Error adding endpoint:', error);
    }
  } else {
    try{
      if (onSubmit) {
        onSubmit( {
          name: endpointName,
          httpMethod: selectedOption,
          url: endpointUrl,
          requestBodyModel: requestBody,
          responseBodyModel: responseBody,
        });
        navigate('/endpoints');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      showToast(toastMessages.endpoint.updateError);
    }
    }
  };

  const handleUrlValidation = (url: string) => {
    const regex = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
    );
    if (regex.test(url)) {
      setErrorUrl(false); // valid URL
    } else {
      setErrorUrl(true); // invalid URL
      console.error('Invalid URL'); // show error or warning
    }
  };

  const endpointMethod = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
  ];

  const handleSelectMethod = (value: string) => {
    setSelectedOption(value); // Update the selected option state
    console.log('Selected method:', value);
  };

  const handleRequestBodyChange = (value: string) => {
    setRequestBody(value);
    try {
      JSON.parse(value); // valid JSON
      setErrorRequest(false);
    } catch {
      setErrorRequest(true); // invalid JSON
      console.error('Invalid JSON'); // show error or warning
    }
  };

  const handleResponseBodyChange = (value: string) => {
    setResponseBody(value);
    try {
      JSON.parse(value); // valid JSON
      setErrorResponse(false);
    } catch {
      setErrorResponse(true); // invalid JSON
      console.error('Invalid JSON'); // show error or warning
    }
  };

  useEffect(() => {
    if (initialData) {
      setEndpointName(initialData.name ?? '');
      setEndpointUrl(initialData.url ?? '');
      setRequestBody(initialData.requestBodyModel ?? '');
      setResponseBody(initialData.responseBodyModel ?? '');
      setSelectedOption(initialData.httpMethod ?? '');
    }
  }, [initialData]);

  return (
    <ComponentCard title="Add endpoint">
      <Form onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="endpointName">Endpoint Name</Label>
            <Input
              type="text"
              placeholder="Enter endpoint name"
              id="endpointName"
              onChange={(e) => setEndpointName(e.target.value)}
              value={endpointName}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="method">Method</Label>
            <Select
              options={endpointMethod}
              placeholder="Select an endpoint method"
              onChange={handleSelectMethod}
              defaultValue={selectedOption}
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="url">URL</Label>
            <Input
              type="text"
              placeholder="Enter endpoint URL"
              id="url"
              error={errorUrl}
              onChange={(e) => {
                setEndpointUrl(e.target.value);
                handleUrlValidation(e.target.value);
              }}
              hint={errorUrl ? 'Invalid URL format' : ''}
              value={endpointUrl}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="requestBody">Request Body (JSON)</Label>
            <TextArea
              rows={8}
              placeholder='{ "key": "value" }'
              className="bg-gray-50 dark:bg-gray-800 font-mono text-sm border border-gray-300 dark:border-gray-700"
              value={requestBody}
              error={errorRequest}
              onChange={handleRequestBodyChange}
              hint={errorRequest ? 'Invalid JSON format' : ''}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="responseBody">Response Body (JSON)</Label>
            <TextArea
              rows={8}
              placeholder='{ "key": "value" }'
              className="bg-gray-50 dark:bg-gray-800 font-mono text-sm border border-gray-300 dark:border-gray-700"
              value={responseBody}
              error={errorResponse}
              onChange={handleResponseBodyChange}
              hint={errorResponse ? 'Invalid JSON format' : ''}
            />
          </div>

          <div className="flex gap-3">
            <Button size="sm">
              {mode === 'create' ? 'Add endpoint' : 'Update endpoint'}
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
};

export default AddEndpointForm;
