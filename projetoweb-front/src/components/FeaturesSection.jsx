import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2.5rem 2rem;
  height: 100%;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  line-height: 1.6;
`;

const FeaturesSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>Nossos Recursos Especiais</SectionTitle>

        <Row className="g-4">
          <Col md={6} lg={3}>
            <FeatureCard>
              <FeatureIcon>🎥</FeatureIcon>
              <FeatureTitle>Vídeos Exclusivos</FeatureTitle>
              <FeatureDescription>
                Treinos desenvolvidos por especialistas em atividade física para a terceira idade.
              </FeatureDescription>
            </FeatureCard>
          </Col>

          <Col md={6} lg={3}>
            <FeatureCard>
              <FeatureIcon>👨‍⚕️</FeatureIcon>
              <FeatureTitle>Consultoria</FeatureTitle>
              <FeatureDescription>
                Acesso a profissionais especializados no atendimento ao público idoso.
              </FeatureDescription>
            </FeatureCard>
          </Col>

          <Col md={6} lg={3}>
            <FeatureCard>
              <FeatureIcon>🏋️‍♂️</FeatureIcon>
              <FeatureTitle>Academias Parceiras</FeatureTitle>
              <FeatureDescription>
                Encontre estabelecimentos adaptados e com profissionais preparados.
              </FeatureDescription>
            </FeatureCard>
          </Col>

          <Col md={6} lg={3}>
            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>Interface Acessível</FeatureTitle>
              <FeatureDescription>
                Design pensado para facilitar o uso por pessoas de todas as idades.
              </FeatureDescription>
            </FeatureCard>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default FeaturesSection;