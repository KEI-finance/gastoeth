import {useState} from 'react';
import {Paper, Stack, TextField, Typography} from '@mui/material';
import {Layout} from './components/Layout';
import {useGasPrices} from './hooks/useGasPrices';
import {Data} from './components/Data';
import {Heading} from './components/Heading';
import {Footer} from './components/Footer';
import {Calculator} from './components/Calculator';

export default function App() {
  return (
    <Layout>
      <Heading />
      <Paper elevation={3} sx={{p: 3}}>
        <Data />
        <Calculator />
      </Paper>
      <Footer />
    </Layout>
  );
}
