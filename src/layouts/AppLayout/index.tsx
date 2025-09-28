import { Footer, Logo, NavigateMenu } from '@/components';
import { Button } from '@/components/ui/button';
import { useWebSocket } from '@/hooks';
import { useNotificationsSelect } from '@/states';
import { Bell } from 'lucide-react';
import { Link, Outlet, useMatch } from 'react-router-dom';

export const AppLayout = () => {
  useWebSocket();
  const notifications = useNotificationsSelect();
  const isNotification = useMatch('/notificacoes*');
  const isMyAccount = useMatch('/minha-conta*');

  const unreadNotificationsCount = notifications?.filter((notification) => !notification.read).length;

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='w-full min-h-28 md:min-h-24 flex items-center justify-center bg-background shadow-lg shadow-background fixed top-0 z-10'>
        <div className='w-full max-w-[1232px] h-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-8 px-4'>
          <Logo />

          <NavigateMenu />

          <div className='flex order-3 gap-2 md:gap-4'>
            <Button
              variant={isNotification ? 'default' : 'outline'}
              size='icon'
              className='size-9 cursor-pointer duration-300 relative'
              asChild
            >
              <Link to='/notificacoes'>
                <Bell />
                {unreadNotificationsCount > 0 && (
                  <div className='w-6 h-6 flex items-center justify-center bg-primary rounded-2xl absolute -top-2 -right-2'>
                    <span className='text-primary-foreground text-xs font-bold'>{`${unreadNotificationsCount}`}</span>
                  </div>
                )}
              </Link>
            </Button>

            <Button
              variant={isMyAccount ? 'default' : 'outline'}
              className='cursor-pointer duration-300 font-medium text-base min-w-32'
              asChild
            >
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
