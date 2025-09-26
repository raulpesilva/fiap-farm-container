import type { Farm } from '@/@types/farm';
import { coreApi } from '@/api';

export const getMyFarm = async () => {
  const response = await coreApi.get<Farm>('/farm');
  return response.data;
};
