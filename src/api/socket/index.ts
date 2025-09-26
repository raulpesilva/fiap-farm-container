import { getToken } from '@/states';
import { io } from 'socket.io-client';

export const createSocket = () =>
  io('wss://api-fiap-farm.raulpesilva.com', {
    extraHeaders: { Authorization: getToken() || '' },
    autoConnect: false,
  });
