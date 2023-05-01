import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export interface GasPriceResult {
  result: GasPriceData;
}

export interface GasPriceData {
  ProposeGasPrice: string;
  SafeGasPrice: string;
  fastGasPrice: string;
  LastBlock: string;
  gasUsedRatio: string;
  suggestBaseFee: string;
}

export function useGasPrices() {
  return useQuery({
    queryKey: ['gasPrices'],
    queryFn: async () => {
      const result = await axios.get<GasPriceResult>(
        'https://api.etherscan.io/api',
        {
          params: {
            module: 'gastracker',
            action: 'gasoracle',
            apikey: '26WIIBS6SBVYJPIXC34MM1GXKNU125KPQV',
          },
        }
      );
      return result.data.result;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
  });
}
