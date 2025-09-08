import { useReState } from '@raulpesilva/re-state';
import { lazy, Suspense } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const Remote = lazy(
  // @ts-ignore
  async () => import('remote/fiap-farm-mfe')
);

function App() {
  const [count, setCount] = useReState('count', 0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Suspense fallback="loading...">
        <Remote />
      </Suspense>
    </>
  );
}

export default App;
