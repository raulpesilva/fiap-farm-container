import { NotificationCard } from '@/components';
import { getNotifications } from '@/services';
import { dispatchNotifications, useNotificationsSelect } from '@/states';
import { useEffect, useState } from 'react';
import NotificationIcon from '../../assets/icons/notification-un-draw.svg';

const useSortedNotifications = () => {
  const notifications = useNotificationsSelect();
  const [loading, setLoading] = useState(notifications.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const notificationsData = await getNotifications();
        dispatchNotifications(notificationsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedNotifications = notifications.slice().sort((a, b) => {
    if (a.read === null && b.read !== null) return -1;
    if (a.read !== null && b.read === null) return 1;

    if (a.read === null && b.read === null) {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }

    if (a.read && b.read) {
      return new Date(b.read).getTime() - new Date(a.read).getTime();
    }

    return 0;
  });

  return { sortedNotifications, loading };
};

export const Notifications = () => {
  const { sortedNotifications, loading } = useSortedNotifications();

  return (
    <section className='w-full max-w-[1232px] h-full flex flex-col items-center gap-8 p-4 mx-auto'>
      <h1 className='text-xl md:text-2xl font-medium text-primary-foreground text-center'>Notificações</h1>

      {loading && !sortedNotifications?.length && (
        <div className='w-full h-full flex items-center justify-center'>
          <span className='text-sm text-muted-foreground text-center'>Carregando notificações...</span>
        </div>
      )}

      {!loading && !sortedNotifications?.length && (
        <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
          <span className='text-sm text-muted-foreground text-center'>Você ainda não tem notificações</span>
          <img src={NotificationIcon} alt='Banner Not Found' className='w-3/4 max-w-[448px] aspect-[224/145]' />
        </div>
      )}

      {!loading && !!sortedNotifications?.length && (
        <div className='w-full h-full flex flex-col gap-3'>
          {!!sortedNotifications?.length &&
            sortedNotifications.map((n) => (
              <NotificationCard key={n.id} id={n.id} type={n.type} title={n.title} message={n.message} read={n.read} />
            ))}
        </div>
      )}
    </section>
  );
};
