import type { ProductItem } from '@/@types/product';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

export const getProducts = async () => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const response = await coreApi.get<ProductItem[]>(`/products/${farm.id}`);
  return response.data;
};
