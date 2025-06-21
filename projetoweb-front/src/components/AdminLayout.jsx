import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';


const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate('/admin/login');
  };

  return (
    <>
      <Container>
        <header className="d-flex justify-content-between align-items-center my-4">
          <h1>Administração</h1>
          <Button variant="danger" onClick={handleLogout}>
            Sair
          </Button>
        </header>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;