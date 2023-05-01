import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export interface CoingeckoResponse {
  ethereum: {
    usd: number;
  };
}

export function useEthPrice() {
  return useQuery({
    queryKey: ['ethprice'],
    queryFn: async () => {
      const result = await axios.get<CoingeckoResponse>(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'ethereum',
            vs_currencies: 'usd',
          },
        }
      );
      return result.data.ethereum.usd;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });
}
