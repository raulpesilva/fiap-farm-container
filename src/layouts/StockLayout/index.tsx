import { getGoals, getNotifications, getProducts } from '@/services';
import { getTransactionsRequest } from '@/services/getTransactions';
import { dispatchGoals, dispatchNotifications, dispatchProducts, dispatchTransactions, useSalesSelect } from '@/states';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const StockLayout = () => {
  const sales = useSalesSelect();
  const [loading, setLoading] = useState(sales?.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [transactions, productsData, goalsData, notificationsData] = await Promise.all([
          getTransactionsRequest(),
          getProducts(),
          getGoals(),
          getNotifications(),
        ]);
        dispatchTransactions(transactions);
        dispatchProducts(productsData);
        dispatchGoals(goalsData);
        dispatchNotifications(notificationsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !sales?.length) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='text-sm text-muted-foreground text-center'>Carregando dados...</span>
      </div>
    );
  }

  return <Outlet />;
};
