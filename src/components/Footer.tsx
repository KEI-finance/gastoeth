import {Box, Link, Typography} from '@mui/material';
import {useGasPrices} from '../hooks/useGasPrices';
import {useGasPrice} from '../hooks/useGasPrice';

export const Footer = () => {
  const price = useGasPrice();

  return (
    <Box textAlign="center" sx={{mt: 3}}>
      <Typography variant="h6">
        Built by{' '}
        <Link
          href="https://kei.fi"
          target="_blank"
          sx={{
            textDecoration: 'none',
            color: price < 60 ? '#431068' : 'white',
            fontWeight: 'bold',
          }}
        >
          <img
            src="/img/kei.png"
            style={{
              maxHeight: '30px',
              verticalAlign: 'middle',
              marginBottom: 3,
            }}
          />{' '}
          Kei Finance{' '}
        </Link>
      </Typography>
    </Box>
  );
};
