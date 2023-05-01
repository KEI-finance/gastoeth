import {Container, Fade, Paper, styled} from '@mui/material';
import {PropsWithChildren} from 'react';
import {useGasPrices} from '../hooks/useGasPrices';
import Color from 'color';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'center',
  transition: 'background 1s ease-in-out',
});

function calculateColour(price: number, colors: string[], levels: number[]) {
  let color1;
  let color2;

  color1 = Color(colors[0]);
  color2 = color1;

  let prevLevel = 0;
  let level = 0;
  for (let i = 0; i < colors.length; i++) {
    color2 = Color(colors[i]);
    level = levels[i];

    if (price < levels[i]) {
      break;
    }

    color1 = color2;
    prevLevel = levels[i];
  }

  const distance =
    level > prevLevel ? (price - prevLevel) / (level - prevLevel) : 0;
  return color1.mix(color2, distance);
}

function getGradient(price: number) {
  const levels = [0, 50, 100];
  const colors1 = ['#cfd9df', '#fda085', '#ff0844'];
  const colors2 = ['#e2ebf0', '#f6d365', '#ffb199'];

  const color1 = calculateColour(price, colors1, levels);
  const color2 = calculateColour(price, colors2, levels);

  return (
    'linear-gradient(to top, ' +
    color1.hex() +
    ' 0%, ' +
    color2.hex() +
    ' 100%)'
  );
}

export const Layout = ({children}: PropsWithChildren) => {
  const {data} = useGasPrices();
  const price = +(data?.ProposeGasPrice || '0');

  return (
    <Fade in style={{transitionDuration: '1.5s'}}>
      <PageContainer sx={{background: getGradient(price)}}>
        <Container>{children}</Container>
      </PageContainer>
    </Fade>
  );
};
