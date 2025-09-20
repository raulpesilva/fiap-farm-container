import { useNavigate } from 'react-router-dom';
import { dispatchIsAuthenticated } from '../../states';

export const Account = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Account</h1>

      <button
        onClick={() => {
          dispatchIsAuthenticated(false);
          navigate('/');
        }}
      >
        Sair
      </button>
    </div>
  );
};
