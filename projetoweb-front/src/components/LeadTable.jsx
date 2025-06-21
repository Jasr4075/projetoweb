import React, { useState } from 'react';
import { Table, Button, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

const LeadFormModal = ({ show, handleClose, lead, onSubmit, error, loading }) => {
  const [name, setName] = useState(lead ? lead.name : '');
  const [email, setEmail] = useState(lead ? lead.email : '');

  React.useEffect(() => {
    setName(lead ? lead.name : '');
    setEmail(lead ? lead.email : '');
  }, [lead, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: lead ? lead.id : null, name, email });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{lead ? 'Editar Lead' : 'Adicionar Novo Lead'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : (lead ? 'Salvar Alterações' : 'Adicionar Lead')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ConfirmationModal = ({ show, handleClose, handleConfirm, message }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const LeadTable = ({ leads, onSearch, onUpdate, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleEditClick = (lead) => {
    setCurrentLead(lead);
    setModalError(null);
    setShowEditModal(true);
  };

  const handleDeleteClick = (lead) => {
    setLeadToDelete(lead);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (leadToDelete) {
      await onDelete(leadToDelete.id);
      setShowDeleteModal(false);
      setLeadToDelete(null);
    }
  };

  const handleEditSubmit = async (data) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await onUpdate(data.id, data.name, data.email);
      setShowEditModal(false);
    } catch (err) {
      setModalError(err.response?.data?.error || 'Erro ao salvar lead.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleAddClick = () => {
    setCurrentLead(null);
    setModalError(null);
    setShowEditModal(true);
  };

  const handleAddSubmit = async (data) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await onAdd(data.name, data.email);
      setShowEditModal(false);
    } catch (err) {
      setModalError(err.response?.data?.error || 'Erro ao adicionar lead.');
    } finally {
      setModalLoading(false);
    }
  };

  const csvHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'name' },
    { label: 'E-mail', key: 'email' },
    { label: 'Data de Cadastro', key: 'created_at' },
  ];

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <Form onSubmit={handleSearchSubmit} className="d-flex">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-secondary" type="submit">Buscar</Button>
          </InputGroup>
        </Form>
        <div>
          <Button variant="success" className="me-2" onClick={handleAddClick}>Adicionar Novo Lead</Button>
          <CSVLink
            data={leads}
            headers={csvHeaders}
            filename="leads.csv"
            className="btn btn-info text-white"
            target="_blank"
          >
            Exportar CSV
          </CSVLink>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">Nenhum lead encontrado.</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(lead)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(lead)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <LeadFormModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        lead={currentLead}
        onSubmit={currentLead ? handleEditSubmit : handleAddSubmit}
        error={modalError}
        loading={modalLoading}
      />

      <ConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        message={`Tem certeza que deseja excluir o lead "${leadToDelete?.name}" (${leadToDelete?.email})?`}
      />
    </>
  );
};

export default LeadTable;