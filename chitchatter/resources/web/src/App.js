import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import { StoreProvider } from './store';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StoreProvider>
        <CssBaseline />

        <header>
          <Navbar />
        </header>

        <main>
          <Routes />
        </main>

        <footer />
      </StoreProvider>
    </MuiThemeProvider>
  );
};

export default App;
