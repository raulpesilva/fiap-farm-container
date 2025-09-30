import { type OptionSelect } from '@/@types/product';
import { addStock } from '@/services';
import { useProductsSelect } from '@/states';
import { onlyNumbersWithDot } from '@/utils/regex';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DatePicker } from '../DatePicker';
import { SelectProduct } from '../SelectProduct';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const tabs = [
  { label: 'Estoque', value: 'storage' as const },
  { label: 'Plantado', value: 'plant' as const },
  { label: 'Colhido', value: 'harvest' as const },
] as const;

const useFormAddStock = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const selectedProductId = searchParams.get('product-id');
  const selectedProduct = products?.find((product) => product.type === selectedProductId);

  const [selectedType, setSelectedType] = useState<(typeof tabs)[number]>(tabs[0]);
  const [product, setProduct] = useState<OptionSelect | undefined>(selectedProduct || undefined);
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState({ product: '', quantity: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateStock = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError({ product: '', quantity: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!quantity) setError((prev) => ({ ...prev, quantity: 'Digite a quantidade' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione uma data' }));
      if (!product || !quantity || !date) return;

      const formattedQuantity = Number(onlyNumbersWithDot(quantity));

      await addStock({
        product_id: Number(product.type),
        quantity: formattedQuantity,
        date: date.toISOString(),
        type: selectedType.value,
      });

      setProduct(undefined);
      setQuantity('');
      setDate(undefined);

      const canGoBack = window.history.state && window.history.state.idx > 0;
      if (canGoBack) navigate(-1);
      else navigate('/');
    } catch (error: any) {
      console.log('Error creating stock:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ product: '', quantity: '', date: '' });
  };

  return {
    tabs,
    products,
    selectedType,
    product,
    quantity,
    date,
    error,
    loading,
    setSelectedType,
    setProduct,
    setQuantity,
    setDate,
    handleCreateStock,
    onChange,
  };
};

export const FormAddStock = () => {
  const {
    tabs,
    products,
    selectedType,
    product,
    quantity,
    date,
    error,
    loading,
    setSelectedType,
    setProduct,
    setQuantity,
    setDate,
    handleCreateStock,
    onChange,
  } = useFormAddStock();

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <Tabs defaultValue={selectedType.value} className='w-full'>
              <TabsList className='w-full'>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setSelectedType(tab)}
                    className='cursor-pointer duration-300'
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <SelectProduct products={products} product={product} setProduct={setProduct} error={error.product} />

            <div className='grid gap-2'>
              <Label htmlFor='quantity'>Digite a quantidade</Label>
              <Input
                id='quantity'
                type='number'
                placeholder='Digite a quantidade'
                onChange={(e) => onChange(setQuantity, e.target.value)}
                value={quantity}
              />
              {error.quantity && <p className='text-sm text-error'>{error.quantity}</p>}
            </div>

            <DatePicker date={date} setDate={setDate} error={error.date} />

            <Button
              type='submit'
              className='w-full cursor-pointer duration-300'
              onClick={(e) => handleCreateStock(e)}
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar estoque'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
