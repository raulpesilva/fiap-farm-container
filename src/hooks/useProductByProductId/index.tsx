import { useProductsSelect } from '@/states';
import { useMemo } from 'react';

export const useProductByProductId = (id: number) => {
  const products = useProductsSelect();

  const product = useMemo(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (!foundProduct) return null;
    return foundProduct;
  }, [products, id]);

  return product;
};
