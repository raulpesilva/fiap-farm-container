import { Route, Routes } from 'react-router-dom';
import { AddFarmLayout, AppLayout, PublicLayout } from '../layouts';
import {
  Account,
  AddFarm,
  Goals,
  Home,
  Login,
  NotFound,
  Notifications,
  Products,
  Register,
  Sales,
  Stocks,
} from '../pages';
import { useHasFarmSelect, useIsAuthenticatedSelect } from '../states';

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticatedSelect();
  const hasFarm = useHasFarmSelect();

  return (
    <Routes>
      {/* Usuário não logado */}
      {!isAuthenticated && (
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      )}

      {/* Usuário logado mas sem fazenda */}
      {isAuthenticated && !hasFarm && (
        <Route element={<AddFarmLayout />}>
          <Route path='/cadastro-fazenda' element={<AddFarm />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      )}

      {/* Usuário logado com fazenda */}
      {isAuthenticated && hasFarm && (
        <Route element={<AppLayout />}>
          <Route path='/estoques' element={<Stocks />} />
          <Route path='/vendas' element={<Sales />} />
          <Route path='/metas' element={<Goals />} />
          <Route path='/produtos' element={<Products />} />
          <Route path='/notificacoes' element={<Notifications />} />
          <Route path='/minha-conta' element={<Account />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
};
