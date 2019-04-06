import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import { StoreProvider } from './store';
import { SocketsProvider} from "./utils/socket";
import './index.css';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StoreProvider>
        <CssBaseline />

        <header>
          <Navbar />
        </header>
        
        <SocketsProvider>
          <main>
            <Routes />
          </main>
        </SocketsProvider>
        
        <footer />
      </StoreProvider>
    </MuiThemeProvider>
  );
};

export default App;
