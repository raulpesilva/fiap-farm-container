import { useParams } from 'react-router-dom';

export const EditProduct = () => {
  const params = useParams();

  return (
    <div>
      EditProduct
      {params.idProduct}
    </div>
  );
};
