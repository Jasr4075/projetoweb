import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './pages/App.jsx';
import { theme } from './theme';
import AppNavbar from './components/navbar/navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <AppNavbar />
      <App />
    </ThemeProvider>
  </StrictMode>,
);