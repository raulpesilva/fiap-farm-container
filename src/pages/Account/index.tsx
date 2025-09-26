import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { logout } from '@/functions';
import { useUserSelect } from '@/states';
import { useNavigate } from 'react-router-dom';
import AccountIcon from '../../assets/icons/account-un-draw.svg';

const useAccount = () => {
  const navigate = useNavigate();
  const canGoBack = window.history.state && window.history.state.idx > 0;

  const handleGoBack = () => {
    if (canGoBack) navigate(-1);
    else navigate('/');
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return { handleGoBack, handleSignOut };
};

export const Account = () => {
  const { handleGoBack, handleSignOut } = useAccount();
  const user = useUserSelect();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center justify-center gap-8 px-4 mx-auto'>
      <Card className='w-fit flex-col md:flex-row! gap-0'>
        <CardContent className='flex flex-col flex-1 min-w-fit'>
          <CardTitle>Minha conta</CardTitle>
          <CardDescription className='mt-4'>Seja bem-vindo, {`${user?.name || user?.email}`}!</CardDescription>
          <CardDescription>Página em desenvolvimento. Em breve, novidades por aqui!</CardDescription>
        </CardContent>

        <CardContent className='flex-1 min-w-full md:min-w-2xs flex flex-col gap-4 ml-auto mt-8 md:mt-0'>
          <Button
            onClick={handleGoBack}
            className='cursor-pointer duration-300 font-medium text-base'
            variant='default'
          >
            Voltar de onde parou
          </Button>

          <Button
            onClick={handleSignOut}
            className='cursor-pointer duration-300 font-medium text-base'
            variant='outline'
          >
            Trocar de conta
          </Button>
        </CardContent>
      </Card>

      <img src={AccountIcon} alt='Banner Not Found' className='w-3/4 max-w-[448px] aspect-[448/255]' />
    </section>
  );
};
