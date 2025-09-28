import { Navigate, Route, Routes } from 'react-router-dom';
import { AddFarmLayout, AppLayout, MainLayout, ProductLayout, PublicLayout } from '../layouts';
import {
  Account,
  AddFarm,
  AddProduct,
  EditProduct,
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
import { useFarmSelect, useTokenSelect } from '../states';

export const AppRoutes = () => {
  const token = useTokenSelect();
  const farm = useFarmSelect();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Usuário não logado */}
        {!token && (
          <Route element={<PublicLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Register />} />

            <Route path='/cadastro-fazenda' element={<Login />} />
            <Route path='/vendas' element={<Login />} />
            <Route path='/metas' element={<Login />} />
            <Route path='/produtos' element={<Login />} />
            <Route path='/notificacoes' element={<Login />} />
            <Route path='/minha-conta' element={<Login />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        )}

        {/* Usuário logado mas sem fazenda */}
        {!!token && !farm && (
          <Route element={<AddFarmLayout />}>
            <Route path='*' element={<AddFarm />} />
          </Route>
        )}

        {/* Usuário logado com fazenda */}
        {!!token && !!farm && (
          <Route element={<AppLayout />}>
            <Route path='/' element={<Stocks />} />
            <Route path='/vendas' element={<Sales />} />
            <Route path='/metas' element={<Goals />} />
            <Route path='/produtos' element={<ProductLayout />}>
              <Route index element={<Products />} />
              <Route path='cadastro' element={<AddProduct />} />
              <Route path=':idProduct' element={<EditProduct />} />
            </Route>
            <Route path='/notificacoes' element={<Notifications />} />
            <Route path='/minha-conta' element={<Account />} />

            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/cadastro' element={<Navigate to='/' replace />} />
            <Route path='/cadastro-fazenda' element={<Navigate to='/' replace />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
};
