import { COLOR_MAP } from '../product';

export interface GoalItem {
  id: number;
  product_id: number;
  farm_id: number;

  name: string;
  measure: 'quantity' | 'price';
  type: 'storage' | 'plant' | 'harvest' | 'sale';

  value: number;
  target: number;
  completed?: string; // ISO date string when completed
  notified?: string; // ISO date string when notified
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}


export const MEASURE_GOAL: Record<GoalItem['measure'], string> = {
  quantity: 'Quantidade',
  price: 'Valor',
};

export const TYPE_GOAL: Record<GoalItem['type'], string> = {
  storage: 'Armazenar',
  plant: 'Plantar',
  harvest: 'Colher',
  sale: 'Vender',
};

export const COLORS_GOAL: Record<GoalItem['type'], string> = {
  storage: COLOR_MAP['red'],
  plant: COLOR_MAP['yellow'],
  harvest: COLOR_MAP['blue'],
  sale: COLOR_MAP['green'],
};
