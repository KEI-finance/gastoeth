import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {PropsWithChildren} from 'react';

const theme = createTheme({
  typography: {},
});

theme.typography.h1.fontSize = '1.5rem';
theme.typography.h1.fontFamily = "'Bruno Ace', cursive";
theme.typography.h2.fontSize = '5rem';

export const Theme = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
