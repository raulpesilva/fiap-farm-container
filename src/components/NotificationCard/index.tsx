import type { NotificationItem } from '@/@types/notification';
import { markNotificationAsRead } from '@/services';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardDescription, CardTitle } from '../ui/card';

type NotificationCardProps = Pick<NotificationItem, 'id' | 'type' | 'title' | 'message' | 'read'>;

const NOTIFICATION_TYPE_COLOR: Record<NotificationCardProps['type'] | 'default', string> = {
  harvest: 'var(--harvest)',
  sale: 'var(--sale)',
  plant: 'var(--plant)',
  storage: 'var(--storage)',
  default: 'var(--primary)',
};

export const NotificationCard = ({ id, type, title, message, read }: NotificationCardProps) => {
  const markAsRead = async (id: number) => await markNotificationAsRead(id);

  return (
    <Card className='w-full p-0'>
      <CardAction className='w-full'>
        <Button
          variant='ghost'
          className='w-full h-auto justify-start p-0 rounded-xl text-start cursor-pointer duration-300'
          onClick={() => markAsRead(id)}
        >
          <CardContent className='w-full flex gap-4 items-center p-6'>
            <div
              className='w-10 min-w-10 h-10 flex items-center justify-center rounded-lg bg-foreground'
              style={{ color: NOTIFICATION_TYPE_COLOR[type] || NOTIFICATION_TYPE_COLOR.default }}
            >
              <Icon type='goal' size={24} className='w-6 h-6 fill-current' />
            </div>

            <div className='flex flex-col gap-1'>
              <CardTitle className='text-wrap'>{title}</CardTitle>
              <CardDescription className='text-wrap'>{message}</CardDescription>
            </div>

            {!read && <Icon size={18} type='bell' className='w-4 h-4 ml-auto' />}
          </CardContent>
        </Button>
      </CardAction>
    </Card>
  );
};
