import { Icon } from '@/components';
import { Button } from '@/components/ui/button';
import { useFarmSelect, useTokenSelect } from '@/states';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const token = useTokenSelect();
  const farm = useFarmSelect();
  const link = !!token && !farm ? '/cadastro-fazenda' : '/';

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center justify-center gap-8 px-4 mx-auto'>
      <Icon type='notFound' className='w-3/4 max-w-[448px] h-fit' />
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>
        Ops! A página que você procura não existe...
      </h1>
      <Button className='cursor-pointer duration-300 font-medium text-base' asChild>
        <Link to={link}>Voltar para a página inicial</Link>
      </Button>
    </section>
  );
};
