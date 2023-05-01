import {useGasPrices} from './useGasPrices';

export const useGasPrice = () => {
  const {data} = useGasPrices();
  return +(data?.ProposeGasPrice || '0');
};
