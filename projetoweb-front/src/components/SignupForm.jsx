import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 500px;
  margin: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const FormTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 167, 157, 0.4);
  }
`;

const StyledFormControl = styled(Form.Control)`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 167, 157, 0.25);
  }
`;

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/leads';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setError(null);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(API_URL, formData);
        setSubmitted(true);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || 'Ocorreu um erro ao processar sua solicitação.');
        } else if (err.request) {
          setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
          setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
        }
        setSubmitted(false);
      }
    }
    setValidated(true);
  };

  return (
    <FormContainer>
      {submitted ? (
        <Alert variant="success">
          Obrigado, <strong>{formData.name}</strong>! Em breve enviaremos mais informações para <strong>{formData.email}</strong>.
        </Alert>
      ) : (
        <>
          <FormTitle>Comece agora gratuitamente</FormTitle>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <StyledFormControl
                type="text"
                placeholder="Seu nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira seu nome.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <StyledFormControl
                type="email"
                placeholder="seu@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira um e-mail válido.
              </Form.Control.Feedback>
            </Form.Group>

            <StyledButton type="submit">Quero saber mais</StyledButton>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default SignupForm;
