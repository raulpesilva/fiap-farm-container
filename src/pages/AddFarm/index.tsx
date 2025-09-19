import { useNavigate } from 'react-router-dom';
import { dispatchHasFarm } from '../../states';

export const AddFarm = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>AddFarm</h1>

      <button
        onClick={() => {
          dispatchHasFarm(true);
          navigate('/estoques');
        }}
      >
        Adicionar
      </button>
    </div>
  );
};
