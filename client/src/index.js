import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';

import theme from './common/theme';

ReactDOM.render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);
