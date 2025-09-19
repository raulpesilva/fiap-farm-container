import { Footer, Logo } from '@/components';
import { Button } from '@/components/ui/button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const PublicLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/cadastro';

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full min-h-24 flex items-center justify-center bg-background shadow-lg shadow-background fixed top-0 z-10'>
        <div className='w-full max-w-[1232px] h-full flex items-center justify-between px-4'>
          <Logo />

          <div className='flex gap-4'>
            {!isLogin && (
              <Button onClick={() => navigate('/login')} className='cursor-pointer duration-300 font-medium text-base'>
                Entrar
              </Button>
            )}

            {!isRegister && (
              <Button
                onClick={() => navigate('/cadastro')}
                className='cursor-pointer duration-300 font-medium text-base'
                variant='outline'
              >
                Criar conta
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className='w-full h-[calc(100vh-96px)] flex flex-col mt-24 overflow-y-auto'>
        <main className='w-full flex-1 flex flex-col'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
