import { EmptyState, FormAddSale } from '@/components';
import { useProductsSelect } from '@/states';

export const AddSale = () => {
  const products = useProductsSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Cadastrar venda</h1>

      {!products?.length && (
        <EmptyState
          text='Você ainda não cadastrou nenhum produto?'
          buttonText='Cadastrar produto'
          navigateTo='/produtos/cadastro'
        />
      )}

      {!!products?.length && <FormAddSale />}
    </section>
  );
};
