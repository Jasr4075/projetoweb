import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 2.25rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const PlanCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2.5rem;
  height: 100%;
  border: 2px solid ${({ featured, theme }) => (featured ? theme.colors.primary : theme.colors.border)};
  box-shadow: ${({ featured, theme }) => (featured ? `0 8px 24px rgba(0, 167, 157, 0.15)` : theme.shadows.soft)};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PlanTitle = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  .amount {
    font-size: 2.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  .period {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlanFeature = styled.li`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

const PlanButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
  padding: 0.75rem;
  font-weight: 600;
  background: ${({ featured, theme }) => (featured ? theme.colors.primary : theme.colors.textLight)};
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ featured, theme }) => (featured ? theme.colors.primaryHover : theme.colors.text)};
  }
`;

const PricingPlans = () => {
  const plans = [
    {
      name: 'Grátis',
      price: '0',
      featured: false,
      features: [
        '10 vídeos de treino',
        'Acesso a 1 consultoria por mês',
        'Listagem de academias próximas',
        'Suporte básico'
      ],
      buttonText: 'Começar agora'
    },
    {
      name: 'Premium',
      price: '29,90',
      featured: true,
      features: [
        'Vídeos ilimitados',
        'Consultorias ilimitadas',
        'Aulas ao vivo semanais',
        'Planos de treino personalizados',
        'Descontos em academias parceiras',
        'Suporte prioritário'
      ],
      buttonText: 'Assinar agora'
    }
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>Nossos Planos</SectionTitle>

        <Row className="g-4 justify-content-center">
          {plans.map((plan, index) => (
            <Col md={6} lg={5} key={index}>
              <PlanCard featured={plan.featured}>
                <PlanTitle>{plan.name}</PlanTitle>
                <PlanPrice>
                  <span className="amount">R${plan.price}</span>
                  {plan.price !== '0' && <span className="period">/mês</span>}
                </PlanPrice>

                <PlanFeatures>
                  {plan.features.map((feature, i) => (
                    <PlanFeature key={i}>
                      <span className="icon">✓</span> {feature}
                    </PlanFeature>
                  ))}
                </PlanFeatures>

                <PlanButton featured={plan.featured}>
                  {plan.buttonText}
                </PlanButton>
              </PlanCard>
            </Col>
          ))}
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default PricingPlans;