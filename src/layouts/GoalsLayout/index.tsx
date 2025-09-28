import { getGoals, getProducts } from '@/services';
import { dispatchGoals, dispatchProducts, useGoalsSelect } from '@/states';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const GoalsLayout = () => {
  const goals = useGoalsSelect();
  const [loading, setLoading] = useState(goals?.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [goalsData, productsData] = await Promise.all([getGoals(), getProducts()]);
        dispatchGoals(goalsData);
        dispatchProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !goals?.length) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='text-sm text-muted-foreground text-center'>Carregando metas...</span>
      </div>
    );
  }

  return <Outlet />;
};
