import {
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useEthPrice} from '../hooks/useEthPrice';
import {useGasPrice} from '../hooks/useGasPrice';
import {formatEther, parseUnits} from 'ethers';
import Icon from 'react-crypto-icons';
import {Edit, EditOff, Visibility, VisibilityOff} from '@mui/icons-material';

export const Calculator = () => {
  const gasPrice = useGasPrice();
  const {data: ethPrice} = useEthPrice();

  const [gasAmount, setGasAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [ethPriceInput, setEthPriceInput] = useState(
    ethPrice?.toString() || ''
  );
  const [editEthPrice, setEditEthPrice] = useState(false);
  const [gasPriceInput, setGasPriceInput] = useState(gasPrice.toString());
  const [editGasPrice, setEditGasPrice] = useState(false);

  const handleEthAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGasAmount(event.target.value);
  };

  useEffect(() => {
    const amount = parseInt(gasAmount, 10);
    const price = editEthPrice ? parseFloat(ethPriceInput) : ethPrice;
    const gas = editGasPrice ? parseInt(gasPriceInput, 10) : gasPrice;
    if (amount && price && gas) {
      const bnGasPrice = parseUnits(gas.toString(), 'gwei');
      const totalGas = bnGasPrice * BigInt(amount);
      const totalEth = formatEther(totalGas);
      setEthAmount(totalEth);
      setUsdAmount((parseFloat(totalEth) * price).toFixed(2));
    } else {
      setEthAmount('');
      setUsdAmount('');
    }
  }, [
    gasAmount,
    ethPrice,
    ethPriceInput,
    editGasPrice,
    editEthPrice,
    gasPriceInput,
  ]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Calculate Transaction Cost
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          label="Total Gas Amount"
          type="number"
          value={gasAmount}
          onChange={handleEthAmountChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Gas Price"
          type="number"
          value={editGasPrice ? gasPriceInput : gasPrice}
          onChange={event => {
            setGasPriceInput(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle edit"
                  onClick={() => setEditGasPrice(!editGasPrice)}
                  edge="end"
                >
                  {editGasPrice ? <EditOff /> : <Edit />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={!editGasPrice}
        />
        <TextField
          label="Eth Price"
          type="number"
          value={editEthPrice ? ethPriceInput : ethPrice || ''}
          onChange={event => {
            setEthPriceInput(event.target.value);
          }}
          InputProps={{
            startAdornment: <Typography sx={{mr: 1}}>$</Typography>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle edit"
                  onClick={() => setEditEthPrice(!editEthPrice)}
                  edge="end"
                >
                  {editEthPrice ? <EditOff /> : <Edit />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={!editEthPrice}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" width="50%">
                  Total ETH
                </TableCell>
                <TableCell>Total USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right" width="50%">
                  <Typography variant="h6">
                    {ethAmount} <Icon name="eth" size={16} />
                  </Typography>
                </TableCell>
                <TableCell width="50%">
                  <Typography variant="h6">$ {usdAmount}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
};
