import type { NotificationItem } from '@/@types/notification';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

export const getNotifications = async () => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const response = await coreApi.get<NotificationItem[]>(`/notifications/${farm.id}`);
  return response.data;
};
