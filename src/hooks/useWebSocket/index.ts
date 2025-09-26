import { createSocket } from '@/api';
import { getGoals, getNotifications, getProducts } from '@/services';
import { dispatchGoals, dispatchNotifications, dispatchProducts, dispatchTransactions, useFarmSelect } from '@/states';
import { useEffect } from 'react';

export const useWebSocket = () => {
  const farm = useFarmSelect();

  useEffect(() => {
    const socket = createSocket();
    console.log('Connecting to WebSocket...');
    socket.connect();
    socket.on('connect', () => {
      if (!farm?.id) return;
      socket.emit('joinFarmRoom', farm.id);
      console.log('Connected to WebSocket with ID:', socket.id);
    });

    socket.on('product:update', async (data) => {
      console.log('Product updated', data);
      const productsData = await getProducts();
      dispatchProducts(productsData);
    });
    socket.on('notification:new', async (data) => {
      console.log('New notification', data);
      const notificationsData = await getNotifications();
      dispatchNotifications(notificationsData);
    });
    socket.on('notification:update', async (data) => {
      console.log('Notification updated', data);
      const notificationsData = await getNotifications();
      dispatchNotifications(notificationsData);
    });
    socket.on('goal:updated', async (data) => {
      console.log('Goal updated', data);
      const goals = await getGoals();
      dispatchGoals(goals);
    });
    socket.on('goal:new', async (data) => {
      console.log('New goal', data);
      const goals = await getGoals();
      dispatchGoals(goals);
    });
    socket.on('transaction:new', (data) => {
      console.log('New transaction', data);
      dispatchTransactions((prev) => [data, ...prev]);
    });

    socket.on('disconnect', () => {
      socket.removeAllListeners();
      console.log('Disconnected from WebSocket');
    });
    return () => {
      socket.disconnect();
    };
  }, [farm]);
};
