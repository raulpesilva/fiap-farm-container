import { Footer, Logo } from '@/components';
import { Button } from '@/components/ui/button';
import { logout } from '@/functions';
import { Outlet } from 'react-router-dom';

export const AddFarmLayout = () => {
  const handleSignOut = () => logout();

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full min-h-24 flex items-center justify-center bg-background shadow-lg shadow-background fixed top-0 z-10'>
        <div className='w-full max-w-[1232px] h-full flex items-center justify-between gap-4 md:gap-8 px-4'>
          <Logo />

          <Button
            onClick={handleSignOut}
            className='cursor-pointer duration-300 font-medium text-base'
            variant='outline'
          >
            Trocar de conta
          </Button>
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
