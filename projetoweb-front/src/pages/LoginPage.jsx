import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setAuthToken } from '../utils/auth';
import styled from 'styled-components';

const CtaButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: white;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { username, password });
      setAuthToken(response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Erro de login:', err);
      if (err.response) {
        setError(err.response.data.error || 'Credenciais inválidas.');
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <h3>Login Administrativo</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <CtaButton variant="primary" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </CtaButton>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;