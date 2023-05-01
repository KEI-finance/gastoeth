import {Box, Typography} from '@mui/material';
import {useGasPrices} from '../hooks/useGasPrices';
import Icon from 'react-crypto-icons';

export const Heading = () => {
  const {data} = useGasPrices();
  const price = +(data?.ProposeGasPrice || '0');

  let symbols: [string, string];
  if (price < 20) {
    symbols = ['❄️❄️', '❄️❄️'];
  } else if (price < 40) {
    symbols = ['❄️☀️', '☀️❄️'];
  } else if (price < 60) {
    symbols = ['☀️☀️', '☀️☀️'];
  } else if (price < 80) {
    symbols = ['☀️🔥', '🔥☀️'];
  } else {
    symbols = ['🔥🔥', '🔥🔥'];
  }

  return (
    <Box textAlign="center">
      <Typography variant="h1">
        <Icon name="eth" size={20} /> GAS PRICE <Icon name="eth" size={20} />
      </Typography>
      <Typography variant="h2" sx={{mb: 3}}>
        {symbols[0]} {data?.ProposeGasPrice} {symbols[1]}
      </Typography>
    </Box>
  );
};
