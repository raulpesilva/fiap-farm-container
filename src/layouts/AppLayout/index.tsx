import { Footer, Logo, NavigateMenu } from '@/components';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full min-h-28 md:min-h-24 flex items-center justify-center bg-background shadow-lg shadow-background fixed top-0 z-10'>
        <div className='w-full max-w-[1232px] h-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-8 px-4'>
          <Logo />

          <NavigateMenu />

          <div className='flex order-3 gap-2 md:gap-4'>
            <Button variant='outline' size='icon' className='size-9 cursor-pointer' asChild>
              <Link to='/notificacoes'>
                <Bell />
              </Link>
            </Button>

            <Button variant='outline' className='cursor-pointer duration-300 font-medium text-base' asChild>
              <Link to='/minha-conta'>Minha conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className='w-full h-[calc(100vh-112px)] md:h-[calc(100vh-96px)] flex flex-col mt-28 md:mt-24 overflow-y-auto'>
        <main className='w-full flex-1 flex flex-col'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
