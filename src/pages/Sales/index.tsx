import { EmptyState, SaleCard, SalesChart } from '@/components';
import { Button } from '@/components/ui/button';
import { useProductsSelect, useSalesSelect } from '@/states';
import { Link } from 'react-router-dom';

export const Sales = () => {
  const sales = useSalesSelect();
  const products = useProductsSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Vendas</h1>

      {!products?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhum produto?'
          buttonText='Cadastrar produto'
          navigateTo='/produtos/cadastro'
        />
      )}

      {!!products?.length && !sales?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhuma venda?'
          buttonText='Cadastrar venda'
          navigateTo='/vendas/cadastro'
        />
      )}

      {!!sales?.length && (
        <>
          <Button className='cursor-pointer duration-300' asChild>
            <Link to='/vendas/cadastro'>Cadastrar venda</Link>
          </Button>

          <SalesChart />

          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {sales.map((g) => (
              <SaleCard
                key={g.id}
                product_id={g.product_id}
                price={g.price}
                quantity={g.quantity}
                total_price={g.total_price}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
