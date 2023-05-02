import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
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
import React, {useEffect, useRef, useState} from 'react';
import {useEthPrice} from '../hooks/useEthPrice';
import {useGasPrice} from '../hooks/useGasPrice';
import {formatEther, parseUnits} from 'ethers';
import Icon from 'react-crypto-icons';
import {Edit, EditOff, Search, Settings} from '@mui/icons-material';
import {useIsMobile} from '../hooks/useIsMobile';

const MENU_ITEMS = [
  {label: 'Uniswap Trade', amount: 226876},
  {label: 'Token Transfer', amount: 58926},
  {label: 'ETH Transfer', amount: 21000},
];

export const Calculator = () => {
  const gasPrice = useGasPrice();
  const {data: ethPrice} = useEthPrice();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLButtonElement | null>(null);

  const [configure, setConfigure] = useState(false);
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

  const handleGasSetting = (gas: number) => {
    return () => {
      setGasAmount(gas.toString());
      setConfigure(false);
    };
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
    gasPrice,
    ethPrice,
    ethPriceInput,
    editGasPrice,
    editEthPrice,
    gasPriceInput,
  ]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5" textAlign="center">
        Calculate Transaction Cost
      </Typography>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'stretch' : 'center'}
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          label="Total Gas Amount"
          type="number"
          value={gasAmount}
          onChange={handleEthAmountChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle edit"
                  edge="end"
                  ref={ref}
                  onClick={() => setConfigure(true)}
                >
                  <Settings />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
            {!isMobile ? (
              <>
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
                        {isMobile
                          ? parseFloat(ethAmount).toLocaleString('en-US', {
                              maximumFractionDigits: 6,
                            })
                          : ethAmount}{' '}
                        <Icon name="eth" size={16} />
                      </Typography>
                    </TableCell>
                    <TableCell width="50%">
                      <Typography variant="h6">$ {usdAmount}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {ethAmount} <Icon name="eth" size={16} />
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">$ {usdAmount}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Stack>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={ref.current}
        open={configure}
        onClose={() => setConfigure(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {MENU_ITEMS.map(item => {
          return (
            <MenuItem key={item.label} onClick={handleGasSetting(item.amount)}>
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
};
