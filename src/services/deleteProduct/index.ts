import type { ProductItem } from '@/@types/product';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

export const deleteProduct = async (id: number) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');

  const response = await coreApi.delete<ProductItem>(`/product/${farm.id}/${id}`);
  return response.data;
};
