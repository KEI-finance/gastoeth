import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {useGasPrices} from '../hooks/useGasPrices';
import Icon from 'react-crypto-icons';
import {useEffect} from 'react';
import {useIsMobile} from '../hooks/useIsMobile';

export const Heading = () => {
  const {data} = useGasPrices();
  const price = +(data?.ProposeGasPrice || '0');
  const isMobile = useIsMobile();

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

  useEffect(() => {
    (document.getElementById('favicon') as HTMLLinkElement).href =
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>' +
      symbols[1] +
      '</text></svg>';
    window.document.head;
  }, symbols);

  return (
    <Box textAlign="center">
      <Typography variant="h1">
        <Icon name="eth" size={20} /> GAS PRICE <Icon name="eth" size={20} />
      </Typography>
      <Typography variant="h2" sx={{mb: 3}}>
        {isMobile ? symbols[0].substring(2) : symbols[0]}{' '}
        {data?.ProposeGasPrice}{' '}
        {isMobile ? symbols[0].substring(2) : symbols[1]}
      </Typography>
    </Box>
  );
};
