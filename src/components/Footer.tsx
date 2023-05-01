import {Box, Link, Typography} from '@mui/material';
import {useGasPrice} from '../hooks/useGasPrice';

export const Footer = () => {
  const price = useGasPrice();
  const threshold = 80;
  return (
    <Box textAlign="center" sx={{mt: 3}}>
      <Typography
        variant="h6"
        style={{
          color: price < threshold ? '#431068' : 'white',
        }}
      >
        Built by{' '}
        <Link
          href="https://kei.fi"
          target="_blank"
          sx={{
            textDecoration: 'none',
            color: price < threshold ? '#431068' : 'white',
          }}
        >
          <img
            src={price < threshold ? '/img/kei.png' : '/img/kei-white.png'}
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
