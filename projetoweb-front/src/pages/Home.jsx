import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import GymLocator from '../components/GymLocator';
import PricingPlans from '../components/PricingPlans';
import CallToAction from '../components/CallToAction';

const MainContainer = styled(Container)`
  padding: 0;
  overflow-x: hidden;
`;

const Section = styled.section`
  padding: 4rem 0;
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const LandingPage = () => {
  return (
    <MainContainer fluid>
      <Section id="home">
      <HeroSection />
      </Section>

      <Section id="recursos">
        <FeaturesSection />
      </Section>

      <Section id="academias">
        <GymLocator />
      </Section>

      <Section id="planos">
        <PricingPlans />
      </Section>

      <Section id="cta">
        <CallToAction />
      </Section>
    </MainContainer>
  );
};

export default LandingPage;