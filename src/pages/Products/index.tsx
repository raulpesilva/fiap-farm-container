import { EmptyState, ProductCard } from '@/components';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/services';
import { dispatchProducts, useProductsSelect } from '@/states';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const navigate = useNavigate();
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

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Produtos</h1>

      {loading && !products?.length && (
        <div className='w-full h-full flex items-center justify-center'>
          <span className='text-sm text-muted-foreground text-center'>Carregando produtos...</span>
        </div>
      )}

      {!loading && !products?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhum produto?'
          buttonText='Cadastrar produto'
          navigateTo='/produtos/cadastro'
        />
      )}

      {!loading && !!products?.length && (
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
