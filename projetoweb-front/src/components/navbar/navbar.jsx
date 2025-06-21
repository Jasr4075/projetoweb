import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 0.8rem 0;
`;

const BrandLogo = styled(Navbar.Brand)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  margin: 0 0.5rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

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


const AppNavbar = () => {
  return (
    <StyledNavbar expand="lg" sticky="top">
      <Container>
        <BrandLogo href="/">AtivoVo</BrandLogo>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <StyledNavLink href="#recursos">Recursos</StyledNavLink>
            <StyledNavLink href="#academias">Academias</StyledNavLink>
            <StyledNavLink href="#planos">Planos</StyledNavLink>
          </Nav>
          <Nav>
            <CtaButton href="/admin/login">Login</CtaButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppNavbar;