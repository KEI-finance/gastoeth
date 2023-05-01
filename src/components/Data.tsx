import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {useGasPrices} from '../hooks/useGasPrices';
import {useEthPrice} from '../hooks/useEthPrice';

export const Data = () => {
  const {data} = useGasPrices();
  const {data: price} = useEthPrice();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Current Gas Price</TableCell>
            <TableCell>Base Gas Cost</TableCell>
            <TableCell>Current Eth Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{data?.ProposeGasPrice || '0'} Gwei</TableCell>
            <TableCell>{data?.suggestBaseFee || '0'} Gwei</TableCell>
            <TableCell>{price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
