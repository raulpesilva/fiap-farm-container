import { type ColorOptionSelect, type IconOptionSelect } from '@/@types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProduct } from '@/services';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectColor } from '../SelectColor';
import { SelectIcon } from '../SelectIcon';

const useFormAddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<IconOptionSelect | undefined>();
  const [color, setColor] = useState<ColorOptionSelect | undefined>();
  const [error, setError] = useState({ name: '', icon: '', color: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError({ name: '', icon: '', color: '' });

      const iconElem = icon?.icon;
      const colorElem = color?.type;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!iconElem) setError((prev) => ({ ...prev, icon: 'Selecione um ícone' }));
      if (!colorElem) setError((prev) => ({ ...prev, color: 'Selecione uma cor' }));
      if (!name || !iconElem || !colorElem) return;

      await addProduct({ name, icon: iconElem, color: colorElem });

      setName('');
      setIcon(undefined);
      setColor(undefined);

      const canGoBack = window.history.state && window.history.state.idx > 0;
      if (canGoBack) navigate(-1);
      else navigate('/produtos');
    } catch (error: any) {
      console.log('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ name: '', icon: '', color: '' });
  };

  return { name, icon, color, error, loading, setName, setIcon, setColor, handleCreateProduct, onChange };
};

export function FormAddProduct() {
  const { name, icon, color, error, loading, setName, setIcon, setColor, handleCreateProduct, onChange } =
    useFormAddProduct();

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid group'>
              <Label className='pb-2' htmlFor='name'>
                Nome do produto
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Digite o nome'
                onChange={(e) => onChange(setName, e.target.value)}
                value={name}
                className='group-hover:bg-input/50! transition-colors duration-300'
              />
              {error.name && <p className='text-sm text-error'>{error.name}</p>}
            </div>

            <SelectIcon icon={icon} setIcon={setIcon} error={error.icon} />

            <SelectColor color={color} setColor={setColor} error={error.color} />

            <Button
              type='submit'
              className='w-full cursor-pointer duration-300'
              onClick={(e) => handleCreateProduct(e)}
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar produto'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
