import { COLOR_MAP } from '@/@types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useProductsSelect, useTransactionsSelect } from '@/states';
import { formatDate } from '@/utils';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

interface HistoryProps {
  date: string;
  [productName: string]: number | string;
}

export const StocksChartArea = () => {
  const products = useProductsSelect();
  const transactions = useTransactionsSelect();

  const stockData = useMemo(() => {
    if (!products.length || !transactions.length) return [];

    const sortedDates = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const stockByProduct: Record<string, number> = {};
    const history: HistoryProps[] = [];

    products.forEach((p) => (stockByProduct[p.id] = 0));

    sortedDates.forEach((t) => {
      if (t.type === 'sale') return;

      stockByProduct[t.product_id] += t.quantity;

      const point: HistoryProps = { date: t.date };
      products.forEach((p) => (point[p.name] = stockByProduct[p.id]));
      history.push(point);
    });

    return history;
  }, [products, transactions]);

  if (!stockData.length) return null;

  const chartConfig = products.reduce((acc, p) => {
    acc[p.name] = { label: p.name, color: COLOR_MAP[p.color || 'blue'] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className='w-full flex flex-col gap-4'>
      <CardHeader className='justify-center'>
        <CardTitle className='text-wrap leading-5'>Estoque por produto ao longo do tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='aspect-auto h-[320px] w-full'>
          <AreaChart data={stockData}>
            <defs>
              {products.map((p) => (
                <linearGradient key={p.id} id={`fill-${p.id}`} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={COLOR_MAP[p.color || 'blue']} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={COLOR_MAP[p.color || 'blue']} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDate(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value) => formatDate(value)} indicator='dot' />}
            />

            {products.map((p) => (
              <Area
                key={p.id}
                dataKey={p.name}
                type='natural'
                fill={`url(#fill-${p.id})`}
                stroke={COLOR_MAP[p.color || 'blue']}
              />
            ))}

            <ChartLegend
              content={({ payload }) => (
                <div className='grid grid-cols-2 gap-2 mt-4'>
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
