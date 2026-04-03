import React from "react";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
