import { StocksChartArea } from '../StocksChartArea';
import { StocksChartPie } from '../StocksChartPie';

export const StocksChart = () => {
  return (
    <div className='w-full flex flex-col lg:flex-row! gap-3'>
      <StocksChartPie />
      <StocksChartArea />
    </div>
  );
};
