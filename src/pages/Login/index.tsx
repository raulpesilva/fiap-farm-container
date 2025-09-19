import { useNavigate } from 'react-router-dom';
import { dispatchIsAuthenticated } from '../../states';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>

      <a href='/cadastro'>Register</a>

      <button
        onClick={() => {
          dispatchIsAuthenticated(true);
          navigate('/cadastro-fazenda');
        }}
      >
        Logar
      </button>
    </div>
  );
};
