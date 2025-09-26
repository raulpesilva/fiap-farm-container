import type { GoalItem } from '@/@types/goal';
import { coreApi } from '@/api';

type AddGoalPayload = Omit<GoalItem, 'id' | 'value' | 'completed' | 'notified' | 'created_at' | 'updated_at'>;

export const addGoal = async (content: AddGoalPayload) => {
  const payload = {
    product_id: content.product_id,
    name: content.name,
    type: content.type,
    measure: content.measure,
    target: content.target,
  };
  const response = await coreApi.post<GoalItem>(`/goals/${content.farm_id}`, payload);
  return response.data;
};
