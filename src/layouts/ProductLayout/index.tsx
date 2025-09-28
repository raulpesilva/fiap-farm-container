import { getProducts } from '@/services';
import { dispatchProducts, useProductsSelect } from '@/states';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const ProductLayout = () => {
  const products = useProductsSelect();
  const [loading, setLoading] = useState(products?.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        dispatchProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !products?.length) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='text-sm text-muted-foreground text-center'>Carregando produtos...</span>
      </div>
    );
  }

  return <Outlet />;
};
