import { FormAddSale } from '@/components';

export const AddSale = () => {
  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Cadastrar venda</h1>
      <FormAddSale />
    </section>
  );
};
