import type { NotificationItem } from '@/@types/notification';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

export const markNotificationAsRead = async (id: number) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');

  const response = await coreApi.post<NotificationItem>(`/notifications/read/${farm.id}/${id}`);
  return response.data;
};
