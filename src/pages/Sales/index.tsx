import { EmptyState, SaleCard } from '@/components';
import { Button } from '@/components/ui/button';
import { useSalesSelect } from '@/states';
import { useNavigate } from 'react-router-dom';

export const Sales = () => {
  const navigate = useNavigate();
  const sales = useSalesSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Vendas</h1>

      {!sales?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhuma venda?'
          buttonText='Cadastrar venda'
          navigateTo='/vendas/cadastro'
        />
      )}

      {!!sales?.length && (
        <>
          <Button className='cursor-pointer duration-300' onClick={() => navigate('/vendas/cadastro')}>
            Cadastrar venda
          </Button>
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
