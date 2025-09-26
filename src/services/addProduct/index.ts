import type { ProductItem } from '@/@types/product';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

type AddProductPayload = Omit<ProductItem, 'id' | 'created_at' | 'updated_at' | 'farm_id'>;

export const addProduct = async (content: AddProductPayload) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const payload = {
    name: content.name,
    icon: content.icon,
    color: content.color,
  };
  const response = await coreApi.post<ProductItem>(`/product/${farm.id}`, payload);
  return response.data;
};
