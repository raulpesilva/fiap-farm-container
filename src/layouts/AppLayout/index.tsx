import { Footer, Logo, NavigateMenu } from '@/components';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full min-h-24 flex items-center justify-center bg-background shadow-lg shadow-background fixed top-0 z-10'>
        <div className='w-full max-w-[1232px] h-full flex items-center justify-between px-4'>
          <Logo />

          <NavigateMenu />

          <div className='flex gap-4'>
            <Button
              onClick={() => navigate('/notificacoes')}
              variant='outline'
              size='icon'
              className='size-9 cursor-pointer'
            >
              <Bell />
            </Button>

            <Button
              onClick={() => navigate('/minha-conta')}
              variant='outline'
              className='cursor-pointer duration-300 font-medium text-base'
            >
              Minha conta
            </Button>
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
