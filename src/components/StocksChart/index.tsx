import { StocksChartArea } from '../StocksChartArea';
import { StocksChartPie } from '../StocksChartPie';

export const StocksChart = () => {
  return (
    <div className='w-full flex flex-col lg:grid lg:grid-cols-2 gap-3'>
      <StocksChartPie />
      <StocksChartArea />
    </div>
  );
};
