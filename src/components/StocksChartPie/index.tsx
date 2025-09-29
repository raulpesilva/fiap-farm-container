import { COLOR_MAP } from '@/@types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartLegend } from '@/components/ui/chart';
import { useProductsSelect, useTransactionsSelect } from '@/states';
import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

export const StocksChartPie = () => {
  const products = useProductsSelect();
  const transactions = useTransactionsSelect();

  const { chartData, chartConfig } = useMemo(() => {
    if (!products.length || !transactions.length) return { chartData: [], chartConfig: {} as ChartConfig };

    const items = products
      .map((product) => {
        const total = transactions.reduce((acc, item) => {
          if (item.product_id !== product.id) return acc;
          if (item.type === 'sale') return acc;
          return acc + item.quantity;
        }, 0);

        const color = COLOR_MAP[product?.color || 'blue'];
        return { product: product.name, stock: total, fill: color };
      })
      .filter((item) => item.stock > 0);

    if (items.length === 0) return { chartData: [], chartConfig: {} as ChartConfig };

    const totalStock = items.reduce((acc, item) => acc + item.stock, 0);

    const chartData = items.map((item) => ({ ...item, percentage: ((item.stock / totalStock) * 100).toFixed(2) }));

    const chartConfig = chartData.reduce((acc, item) => {
      acc[item.product] = { label: `${item.product} (${item.stock} un. - ${item.percentage}%)`, color: item.fill };
      return acc;
    }, {} as ChartConfig);

    return { chartData, chartConfig };
  }, [products, transactions]);

  if (!chartData.length) return null;

  return (
    <Card className='w-full flex flex-col gap-0'>
      <CardHeader className='justify-center'>
        <CardTitle className='text-wrap leading-5'>Estoque por produto</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[320px]'>
          <PieChart>
            <Pie data={chartData} dataKey='stock' nameKey='product' innerRadius={56} strokeWidth={5} />
            <ChartLegend
              content={({ payload }) => (
                <div className='flex flex-col items-center gap-2'>
                  {payload?.map((entry: any, index: number) => (
                    <div key={`legend-${index}`} className='flex items-center gap-2'>
                      <span className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }} />
                      <span className='text-sm text-muted-foreground'>
                        {chartConfig[entry.value]?.label ?? entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
