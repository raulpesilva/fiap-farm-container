import { type OptionSelect } from '@/@types/product';
import { addSale } from '@/services';
import { useProductsSelect } from '@/states';
import { formatBRLCurrencyInput, formatBRLCurrencyPayload, unformatBRLCurrencyInput } from '@/utils';
import { onlyNumbers } from '@/utils/regex';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DatePicker } from '../DatePicker';
import { SelectProduct } from '../SelectProduct';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const tabs = [
  { label: 'Valor total', value: 'total' } as const,
  { label: 'Valor por unidade', value: 'unit' } as const,
];

const useFormAddSale = () => {
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

  const [product, setProduct] = useState<OptionSelect | undefined>(selectedProduct || undefined);
  const [quantity, setQuantity] = useState('');
  const [tabActive, setTabActive] = useState(tabs[0]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState({ product: '', value: '', price: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateSale = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError({ product: '', value: '', price: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!quantity) setError((prev) => ({ ...prev, value: 'Digite a quantidade' }));
      if (!price) setError((prev) => ({ ...prev, price: 'Digite o valor' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !quantity || !price || !date) return;

      const formattedQuantity = Number(onlyNumbers(quantity));

      let pricePayload = formatBRLCurrencyPayload(unformatBRLCurrencyInput(price));
      if (tabActive.value !== 'total') pricePayload *= formattedQuantity;

      await addSale({
        product_id: Number(product.type),
        quantity: formattedQuantity,
        total_price: pricePayload,
        date: date.toISOString(),
      });

      setProduct(undefined);
      setQuantity('');
      setPrice('');
      setDate(undefined);

      const canGoBack = window.history.state && window.history.state.idx > 0;
      if (canGoBack) navigate(-1);
      else navigate('/vendas');
    } catch (error: any) {
      console.log('Error creating sale:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ product: '', value: '', price: '', date: '' });
  };

  return {
    tabs,
    products,
    product,
    quantity,
    tabActive,
    price,
    date,
    error,
    loading,
    setProduct,
    setQuantity,
    setTabActive,
    setPrice,
    setDate,
    handleCreateSale,
    onChange,
  };
};

export const FormAddSale = () => {
  const {
    tabs,
    products,
    product,
    quantity,
    tabActive,
    price,
    date,
    error,
    loading,
    setProduct,
    setQuantity,
    setTabActive,
    setPrice,
    setDate,
    handleCreateSale,
    onChange,
  } = useFormAddSale();

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <SelectProduct products={products} product={product} setProduct={setProduct} error={error.product} />

            <div className='grid group'>
              <Label className='pb-2' htmlFor='quantity'>
                Digite a quantidade
              </Label>
              <Input
                id='quantity'
                type='number'
                placeholder='Digite a quantidade'
                onChange={(e) => onChange(setQuantity, e.target.value)}
                value={quantity}
                className='group-hover:bg-input/50! transition-colors duration-300'
              />
              {error.value && <p className='text-sm text-error'>{error.value}</p>}
            </div>

            <Tabs
              value={tabActive.value}
              onValueChange={(val) => {
                const selected = tabs.find((t) => t.value === val);
                if (selected) setTabActive(selected);
              }}
              className='w-full flex flex-col gap-6'
            >
              <TabsList className='grid grid-cols-2 w-full'>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className='cursor-pointer duration-300'>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={tabActive.value} className='flex flex-col group'>
                <Label className='pb-2' htmlFor='price'>
                  {tabActive.value === 'total' ? 'Digite o valor total' : 'Digite o valor por unidade'}
                </Label>
                <Input
                  id='price'
                  type='text'
                  inputMode='numeric'
                  placeholder='Digite o valor'
                  value={price}
                  onChange={(e) => {
                    const formatted = formatBRLCurrencyInput(e.target.value);
                    onChange(setPrice, formatted);
                  }}
                  className='group-hover:bg-input/50! transition-colors duration-300'
                />
                {error.price && <p className='text-sm text-error'>{error.price}</p>}
              </TabsContent>
            </Tabs>

            <DatePicker date={date} setDate={setDate} error={error.date} />

            <Button
              type='submit'
              className='w-full cursor-pointer duration-300'
              onClick={(e) => handleCreateSale(e)}
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar venda'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
