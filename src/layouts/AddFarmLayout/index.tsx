import { Outlet } from 'react-router-dom';

export const AddFarmLayout = () => {
  return (
    <div>
      <header>Header da criação de fazenda</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer da criação de fazenda</footer>
    </div>
  );
};
