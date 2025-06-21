import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import SignupForm from './SignupForm';

const HeroWrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  padding: 6rem 0 4rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const List = styled.ul`
  text-align: left;
  font-size: 1.125rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 1.25rem;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '✔';
      color: ${({ theme }) => theme.colors.primary};
      position: absolute;
      left: 0;
      font-size: 1rem;
    }
  }
`;

const HeroSection = () => {
  return (
    <HeroWrapper>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <HeroTitle>
              Vida Ativa para a Melhor <Highlight>Idade</Highlight>
            </HeroTitle>
            <HeroSubtitle>
              Treinos adaptados, consultoria especializada e tudo que você precisa para manter-se ativo e saudável!
            </HeroSubtitle>
            <List>
              <li>Vídeos com exercícios específicos</li>
              <li>Acompanhamento de profissionais</li>
              <li>Academias próximas de você</li>
            </List>
          </Col>
          <Col lg={6}>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </HeroWrapper>
  );
};

export default HeroSection;