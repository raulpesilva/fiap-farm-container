import { logout } from '@/functions';
import { getMyFarm } from '@/services';
import { dispatchFarm, dispatchToken } from '@/states';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const useRestore = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreState = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          dispatchToken(token);
          const farm = await getMyFarm();
          if (farm) dispatchFarm(farm);
        }
      } catch (e) {
        console.warn('Error restoring token and farm from AsyncStorage', e);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreState();
  }, []);

  return loading;
};

export const MainLayout = () => {
  const loadingRestore = useRestore();

  if (loadingRestore) return null;
  return <Outlet />;
};
