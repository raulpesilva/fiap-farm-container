import type { GoalItem } from '@/@types/goal';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

export const getGoals = async () => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const response = await coreApi.get<GoalItem[]>(`/goals/${farm.id}`);
  return response.data;
};
