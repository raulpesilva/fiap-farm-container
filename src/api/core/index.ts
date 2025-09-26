import { getToken } from '@/states';
import axios, { AxiosHeaders } from 'axios';

export const coreApi = axios.create({
  baseURL: 'https://api-fiap-farm.raulpesilva.com',
});

coreApi.interceptors.request.use((config) => {
  const token = getToken();
  const headers = new AxiosHeaders(config.headers);
  if (token) headers.setAuthorization(token);
  return { ...config, headers };
});
