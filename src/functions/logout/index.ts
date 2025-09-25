import { resetFarm, resetGoals, resetNotifications, resetProducts, resetStocks, resetToken, resetUser } from '@/states';

export const logout = () => {
  resetToken();
  resetFarm();
  resetGoals();
  resetNotifications();
  resetProducts();
  resetStocks();
  resetUser();
};
