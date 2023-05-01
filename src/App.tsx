import {useState} from 'react';
import {Paper, Stack, TextField, Typography} from '@mui/material';
import {Layout} from './components/Layout';
import {useGasPrices} from './hooks/useGasPrices';
import {Data} from './components/Data';
import {Heading} from './components/Heading';

export default function App() {
  const [ethAmount, setEthAmount] = useState<number>(0);
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const {data} = useGasPrices();

  const gasPrice = parseFloat(data?.ProposeGasPrice || '0');
  const baseGasCost = parseFloat(data?.suggestBaseFee || '0');

  const handleEthAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseFloat(event.target.value);
    setEthAmount(amount);
    setUsdAmount(amount * gasPrice);
  };

  return (
    <Layout>
      <Heading />
      <Paper elevation={3} sx={{p: 3}}>
        <Data />
      </Paper>
      <Stack spacing={3} sx={{maxWidth: 600, margin: 'auto'}}>
        <Stack spacing={1}>
          <Typography variant="h5">Calculate Gas Cost</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              label="ETH Amount"
              type="number"
              value={ethAmount}
              onChange={handleEthAmountChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Gas Price"
              type="number"
              value={gasPrice}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          </Stack>
          {ethAmount > 0 && (
            <Typography>
              {ethAmount} ETH = {(usdAmount * 100).toFixed(2)} cents USD
            </Typography>
          )}
        </Stack>
      </Stack>
    </Layout>
  );
}
