import type { GoalItem } from '@/@types/goal';
import { type OptionSelect } from '@/@types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addGoal } from '@/services';
import { useFarmSelect, useProductsSelect } from '@/states';
import { formatBRLCurrencyInput, formatBRLCurrencyPayload, maskDecimal, unformatBRLCurrencyInput } from '@/utils';
import { onlyNumbers } from '@/utils/regex';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const useFormAddGoal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productsSelect = useProductsSelect();
  const farm = useFarmSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const selectedProductId = searchParams.get('product-id');
  const selectedProduct = products?.find((product) => product.type === selectedProductId);

  const [name, setName] = useState('');
  const [product, setProduct] = useState<OptionSelect | undefined>(selectedProduct || undefined);
  const [target, setTarget] = useState('');
  const [measure, setMeasure] = useState<GoalItem['measure']>('quantity');
  const [type, setType] = useState<GoalItem['type']>('storage');
  const [error, setError] = useState({ name: '', product: '', target: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateGoal = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError({ name: '', product: '', target: '' });

      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!target) setError((prev) => ({ ...prev, target: 'Digite o objetivo' }));
      if (!name || !product || !target || !farm) return;

      let targetFormatted = Number(onlyNumbers(target));
      if (measure !== 'quantity') targetFormatted = Number(formatBRLCurrencyPayload(unformatBRLCurrencyInput(target)));

      await addGoal({
        product_id: Number(product.type),
        farm_id: farm.id,
        name,
        measure,
        type,
        target: targetFormatted,
      });

      setName('');
      setProduct(undefined);
      setTarget('');
      setMeasure('quantity');
      setType('storage');

      const canGoBack = window.history.state && window.history.state.idx > 0;
      if (canGoBack) navigate(-1);
      else navigate('/metas');
    } catch (error: any) {
      console.log('Error creating goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ name: '', product: '', target: '' });
  };

  return {
    products,
    name,
    product,
    target,
    measure,
    type,
    error,
    loading,
    setName,
    setProduct,
    setTarget,
    setMeasure,
    setType,
    handleCreateGoal,
    onChange,
  };
};

export function FormAddGoal() {
  const {
    products,
    name,
    product,
    target,
    measure,
    type,
    error,
    loading,
    setName,
    setProduct,
    setTarget,
    setMeasure,
    setType,
    handleCreateGoal,
    onChange,
  } = useFormAddGoal();

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Digite o nome da meta</Label>
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
              <Label htmlFor='icon'>Selecione o produto</Label>
              <Select
                value={product?.displayName || ''}
                onValueChange={(value) => {
                  const selectedProduct = products.find((product) => product.displayName === value);
                  setProduct(selectedProduct);
                }}
              >
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue placeholder='Selecione um produto' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {products.map((product) => (
                      <SelectItem key={product.type} value={product.displayName} className='duration-300'>
                        <Icon type={product.icon!} className='inline-block mr-2' />
                        {product.displayName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error.product && <p className='text-sm text-error'>{error.product}</p>}
            </div>
            <div className='grid gap-2'>
              <Tabs
                defaultValue='quantity'
                className='w-full'
                onValueChange={(value) => {
                  if (value === 'price') setType('sale');
                  setMeasure(value as GoalItem['measure']);
                }}
                value={measure}
              >
                <TabsList className='w-full'>
                  <TabsTrigger value='quantity' className='cursor-pointer duration-300'>
                    Meta de Quantidade
                  </TabsTrigger>
                  <TabsTrigger value='price' className='cursor-pointer duration-300'>
                    Meta de Preço
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className='grid gap-2'>
              <Tabs
                defaultValue='storage'
                className='w-full'
                onValueChange={(value) => setType(value as GoalItem['type'])}
                value={type}
              >
                <TabsList className='w-full'>
                  {measure !== 'price' && (
                    <>
                      <TabsTrigger value='storage' className='cursor-pointer duration-300'>
                        Estoque
                      </TabsTrigger>
                      <TabsTrigger value='plant' className='cursor-pointer duration-300'>
                        Plantar
                      </TabsTrigger>
                      <TabsTrigger value='harvest' className='cursor-pointer duration-300'>
                        Colher
                      </TabsTrigger>
                    </>
                  )}
                  <TabsTrigger value='sale' className='cursor-pointer duration-300'>
                    Vender
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='name'>Digite o objetivo</Label>
              <Input
                id='name'
                type='text'
                placeholder='Digite o objetivo'
                onChange={(e) => {
                  const formatted =
                    measure === 'quantity' ? maskDecimal(e.target.value) : formatBRLCurrencyInput(e.target.value);
                  onChange(setTarget, formatted);
                }}
                value={target}
              />
              {error.target && <p className='text-sm text-error'>{error.target}</p>}
            </div>

            <Button
              type='submit'
              className='w-full cursor-pointer duration-300'
              onClick={(e) => handleCreateGoal(e)}
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar meta'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
