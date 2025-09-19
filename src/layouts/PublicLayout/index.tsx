import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div>
      <header>Header publico</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer público</footer>
    </div>
  );
};
