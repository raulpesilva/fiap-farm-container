import type { ProductItem } from '@/@types/product';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

type UpdateProductPayload = Omit<ProductItem, 'created_at' | 'updated_at' | 'farm_id'>;

export const updateProduct = async (content: UpdateProductPayload) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const payload = {
    name: content.name,
    icon: content.icon,
    color: content.color,
  };
  const response = await coreApi.put<ProductItem>(`/product/${farm.id}/${content.id}`, payload);
  return response.data;
};
