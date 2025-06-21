import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import SignupForm from './SignupForm';

const CtaSection = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 4rem 0;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const AppButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AppButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  outline-offset: 2px;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    outline: none;
    box-shadow: 0 0 0 3px rgba(255 255 255 / 0.6);
  }
`;

const CallToAction = () => {
  return (
    <CtaSection>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <CtaTitle>Pronto para começar sua jornada de saúde?</CtaTitle>
            <CtaSubtitle>
              Baixe nosso aplicativo ou cadastre-se para receber mais informações
            </CtaSubtitle>
            <Row className="g-4 align-items-center">
              <Col md={6} className="mb-4 mb-md-0">
                <SignupForm />
              </Col>
              <Col md={6}>
                <h4 className="text-white mb-3">Disponível também para:</h4>
                <AppButtons>
                  <AppButton href="#" aria-label="Download na App Store">
                    <i className="bi bi-apple me-2" aria-hidden="true"></i> App Store
                  </AppButton>
                  <AppButton href="#" aria-label="Download no Google Play">
                    <i className="bi bi-google-play me-2" aria-hidden="true"></i> Google Play
                  </AppButton>
                </AppButtons>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </CtaSection>
  );
};

export default CallToAction;