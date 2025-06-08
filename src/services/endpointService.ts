import api from './api';

export interface EndpointModel {
  id?: string;
  name?: string;
  httpMethod?: string;
  url?: string;
  requestBodyModel?: string;
  responseBodyModel?: string;
}

export const getEndpoints = async (): Promise<EndpointModel[]> => {
  const res = await api.get<EndpointModel[]>('api/Endpoint/all-endpoints');
  return res.data;
};

export const getEndpointById = async (id: string): Promise<EndpointModel> => {
  const res = await api.get<EndpointModel>(`api/Endpoint/${id}`);
  return res.data;
};

export const addEndpoint = async (
  data: EndpointModel,
): Promise<EndpointModel> => {
  const res = await api.post<EndpointModel>('api/Endpoint', data);
  return res.data;
};

export const deleteEndpoint = async (id: string): Promise<void> => {
  await api.delete(`api/Endpoint/${id}`);
};

export const updateEndpoint = async (
  id: string,
  data: EndpointModel,
): Promise<EndpointModel> => {
  const res = await api.patch<EndpointModel>(`api/Endpoint/${id}`, data);
  return res.data;
};
