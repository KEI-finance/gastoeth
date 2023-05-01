import {Paper} from '@mui/material';
import {Layout} from './components/Layout';
import {Heading} from './components/Heading';
import {Footer} from './components/Footer';
import {Calculator} from './components/Calculator';

export default function App() {
  return (
    <Layout>
      <Heading />
      <Paper elevation={3} sx={{p: 3}}>
        <Calculator />
      </Paper>
      <Footer />
    </Layout>
  );
}
