import { Button } from '@/components/ui/button';
import { useHasFarmSelect, useIsAuthenticatedSelect } from '@/states';
import { Link } from 'react-router-dom';
import NotFoundIcon from '../../assets/icons/not-found-un-draw.svg';

export const NotFound = () => {
  const isAuthenticated = useIsAuthenticatedSelect();
  const hasFarm = useHasFarmSelect();

  const link = !isAuthenticated ? '/' : hasFarm ? '/estoques' : '/cadastro-fazenda';

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center justify-center gap-8 px-4 mx-auto'>
      <img src={NotFoundIcon} alt='Banner Not Found' className='w-1/2 max-w-[448px]' />
      <h1 className='text-2xl font-medium text-primary-foreground text-center'>
        Ops! A página que você procura não existe...
      </h1>
      <Button className='cursor-pointer duration-300 font-medium text-base' asChild>
        <Link to={link}>Voltar para a página inicial</Link>
      </Button>
    </section>
  );
};
