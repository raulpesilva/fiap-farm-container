import { EmptyState, StocksCard, StocksChart } from '@/components';
import { Button } from '@/components/ui/button';
import { useProductsSelect, useTransactionsSelect } from '@/states';
import { groupByStock } from '@/utils';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const Stocks = () => {
  const transactions = useTransactionsSelect();
  const products = useProductsSelect();

  const group = useMemo(() => {
    const grouped = groupByStock(transactions.filter((t) => products.some((p) => p.id === t.product_id)));
    const mapped = grouped.map((item) => ({ ...item, productData: products.find((p) => p.id === item.product_id) }));
    return mapped;
  }, [transactions, products]);

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Estoques</h1>

      {!transactions?.length && (
        <EmptyState
          text='Vocês ainda não cadastrou nenhum estoque?'
          buttonText='Cadastrar estoque'
          navigateTo='/estoques-cadastro'
        />
      )}

      {!!group?.length && (
        <>
          <Button className='cursor-pointer duration-300' asChild>
            <Link to='/estoques-cadastro'>Cadastrar estoque</Link>
          </Button>

          <StocksChart />

          <div className='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3'>
            {group.map((item) => (
              <StocksCard
                key={item.id}
                productName={item?.productData?.name || ''}
                productIcon={item?.productData?.icon || 'apple'}
                productColor={item?.productData?.color || ''}
                storage={item.storage}
                plant={item.plant}
                harvest={item.harvest}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
