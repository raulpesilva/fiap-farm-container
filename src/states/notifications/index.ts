import type { NotificationItem } from '@/@types/notification';
import { createReStateMethods } from '@raulpesilva/re-state';

const NOTIFICATIONS_KEY = 'notifications';
const initialValue: NotificationItem[] = [];

const methods = createReStateMethods(NOTIFICATIONS_KEY, initialValue);

export const { dispatchNotifications, useNotificationsSelect, resetNotifications } = methods;
