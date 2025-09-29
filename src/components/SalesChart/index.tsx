import { COLOR_MAP } from '@/@types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useProductsSelect, useSalesSelect } from '@/states';
import { formatBRLCurrencyDisplay } from '@/utils';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

export const SalesChart = () => {
  const products = useProductsSelect();
  const sales = useSalesSelect();

  const salesByProduct = useMemo(() => {
    if (!products.length || !sales.length) return [];

    return products.map((product) => {
      const value = sales
        .filter((sale) => sale.product_id === product.id)
        .reduce((acc, sale) => acc + sale.total_price, 0);

      const color = COLOR_MAP[product.color || 'blue'];

      return { name: product.name, value, color };
    });
  }, [products, sales]);

  if (!salesByProduct.length) return null;

  const chartConfig = products.reduce((acc, p) => {
    acc[p.name] = { label: p.name, color: COLOR_MAP[p.color || 'blue'] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className='w-full flex flex-col gap-0'>
      <CardHeader className='justify-center'>
        <CardTitle className='text-wrap leading-5'>Vendas por produto</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='aspect-auto h-[320px] w-full'>
          <BarChart data={salesByProduct} barSize={24} barCategoryGap={48}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='name' axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={formatBRLCurrencyDisplay} width={80} />
            <ChartTooltip
              content={
                <ChartTooltipContent indicator='dot' formatter={(value) => formatBRLCurrencyDisplay(Number(value))} />
              }
            />
            <Bar dataKey='value' radius={[8, 8, 0, 0]}>
              {salesByProduct.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
