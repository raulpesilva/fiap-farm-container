import { EmptyState, ProductCard } from '@/components';
import { Button } from '@/components/ui/button';
import { useProductsSelect } from '@/states';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const navigate = useNavigate();
  const products = useProductsSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Produtos</h1>

      {!products?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhum produto?'
          buttonText='Cadastrar produto'
          navigateTo='/produtos/cadastro'
        />
      )}

      {!!products?.length && (
        <>
          <Button className='cursor-pointer duration-300' onClick={() => navigate('/produtos/cadastro')}>
            Cadastrar produto
          </Button>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {products.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} icon={p.icon} color={p.color} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
