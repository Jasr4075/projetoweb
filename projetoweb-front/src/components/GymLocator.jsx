import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

const MapContainer = styled.div`
  background: #e9ecef;
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.1rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GymList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GymItem = styled.li`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const GymName = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const GymAddress = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const GymDistance = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const GymLocator = () => {
  const gyms = [
    { name: "Academia Vida Ativa", address: "Rua das Flores, 123 - Centro", distance: "0.5 km" },
    { name: "Clube da Melhor Idade", address: "Av. Principal, 456 - Vila Nova", distance: "1.2 km" },
    { name: "Espaço Saúde 60+", address: "Rua dos Esportes, 789 - Jardim", distance: "2.1 km" },
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>Encontre Academias Próximas</SectionTitle>

        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <MapContainer>
              [Mapa interativo mostrando localização do usuário e academias próximas]
            </MapContainer>
          </Col>

          <Col lg={6}>
            <h3 className="mb-3" style={{ color: '#343a40', fontSize: '1.5rem', fontWeight: 500 }}>
              Academias perto de você
            </h3>
            <GymList>
              {gyms.map((gym, index) => (
                <GymItem key={index}>
                  <GymName>{gym.name}</GymName>
                  <GymAddress>{gym.address}</GymAddress>
                  <GymDistance>{gym.distance}</GymDistance>
                </GymItem>
              ))}
            </GymList>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default GymLocator;