import { COLORS_PRODUCT, ICONS_PRODUCT } from '@/@types/product';
import { deleteProduct, updateProduct } from '@/services';
import { useProductsSelect } from '@/states';
import { LoaderCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FormEditProductProps {
  id: number;
}

const useFormEditProduct = (id: number) => {
  const navigate = useNavigate();
  const products = useProductsSelect();

  const product = useMemo(() => {
    if (!id) return null;
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  }, [id, products]);

  const [name, setName] = useState(product?.name ?? '');
  const [icon, setIcon] = useState(ICONS_PRODUCT.find((i) => i.icon === product?.icon));
  const [color, setColor] = useState(COLORS_PRODUCT.find((c) => c.type === product?.color));
  const [error, setError] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const edited = product?.name !== name || product?.icon !== icon?.icon || product?.color !== color?.type;
  const canGoBack = window.history.state && window.history.state.idx > 0;

  const handleUpdateProduct = async () => {
    if (!product) return;
    try {
      setLoading(true);
      setError({ name: '' });

      const iconElem = icon?.icon;
      const colorElem = color?.type;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!name || !iconElem || !colorElem) return;

      await updateProduct({ name, icon: iconElem, color: colorElem, id });
      if (canGoBack) navigate(-1);
      else navigate('/produtos');
    } catch (error: any) {
      setLoading(false);
      console.log('Error editing product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;
    try {
      setLoading(true);
      await deleteProduct(id);
      if (canGoBack) navigate(-1);
      else navigate('/produtos');
    } catch (error: any) {
      setLoading(false);
      console.log('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ name: '' });
  };

  return {
    name,
    icon,
    color,
    error,
    loading,
    edited,
    setName,
    setIcon,
    setColor,
    handleDeleteProduct,
    handleUpdateProduct,
    onChange,
  };
};

export const FormEditProduct = ({ id }: FormEditProductProps) => {
  const {
    name,
    icon,
    color,
    error,
    loading,
    edited,
    setName,
    setIcon,
    setColor,
    onChange,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useFormEditProduct(id);

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nome do produto</Label>
              <Input
                id='name'
                type='text'
                placeholder='Digite o nome'
                onChange={(e) => onChange(setName, e.target.value)}
                value={name}
              />
              {error.name && <p className='text-sm text-error'>{error.name}</p>}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='icon'>Ícone</Label>
              <Select
                value={icon?.displayName}
                onValueChange={(value) => {
                  const selectedIcon = ICONS_PRODUCT.find((icon) => icon.displayName === value);
                  setIcon(selectedIcon);
                }}
              >
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue placeholder='Selecione um ícone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ICONS_PRODUCT.map((icon) => (
                      <SelectItem key={icon.type} value={icon.displayName} className='duration-300'>
                        <Icon type={icon.icon!} className='inline-block mr-2' />
                        {icon.displayName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='color'>Cor</Label>
              <Select
                value={color?.displayName}
                onValueChange={(value) => {
                  const selectedColor = COLORS_PRODUCT.find((color) => color.displayName === value);
                  setColor(selectedColor);
                }}
              >
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue placeholder='Selecione uma cor' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COLORS_PRODUCT.map((color) => (
                      <SelectItem key={color.type} value={color.displayName} className='duration-300'>
                        <span
                          className='inline-block mr-2 w-4 h-4 rounded-full'
                          style={{ backgroundColor: color.color }}
                        />
                        {color.displayName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {edited && (
              <Button
                type='submit'
                className='w-full cursor-pointer duration-300'
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateProduct();
                }}
                disabled={loading}
              >
                {loading ? <LoaderCircle className='animate-spin' /> : 'Salvar alterações'}
              </Button>
            )}

            {!edited && (
              <Button
                type='submit'
                variant='destructive'
                className='w-full cursor-pointer duration-300'
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteProduct();
                }}
                disabled={loading}
              >
                {loading ? <LoaderCircle className='animate-spin' /> : 'Excluir produto'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
