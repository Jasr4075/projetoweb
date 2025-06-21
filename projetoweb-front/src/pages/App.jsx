import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components';
import { isAuthenticated } from '../utils/auth';

import Home from './Home';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/AdminLayout';

const theme = {
  colors: {
    primary: '#00A79D',
    primaryHover: '#008C82',
    white: '#FFFFFF',
    text: '#333333',
    background: '#f8f9fa',
    darkBackground: '#343a40',
    border: '#CCCCCC',
  },
  borderRadius: '8px',
  shadows: {
    medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} /> {/* Redireciona /admin para /admin/dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} /> 
          </Route>
          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;