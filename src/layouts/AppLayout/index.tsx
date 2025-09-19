import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      <header>Header do app logado</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer do app logado</footer>
    </div>
  );
};
