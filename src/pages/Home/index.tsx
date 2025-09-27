import { Icon } from '@/components';

export const Home = () => {
  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col md:flex-row items-center justify-center gap-20 px-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>
        Simplifique a gestão da sua fazenda com tecnologia. <br /> Organize seus estoques, vendas e colheitas em um só
        lugar!
      </h1>

      <Icon type='farm' className='w-3/4 max-w-[448px] h-fit' />
    </section>
  );
};
