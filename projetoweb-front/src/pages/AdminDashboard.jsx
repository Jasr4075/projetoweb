import React, { useState, useEffect, useCallback } from 'react';
import LeadTable from '../components/LeadTable';
import api from '../utils/api';
import { Alert, Spinner } from 'react-bootstrap';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = searchTerm ? `/admin/leads/search?q=${searchTerm}` : '/admin/leads';
      const response = await api.get(endpoint);
      setLeads(response.data);
    } catch (err) {
      console.error('Erro ao buscar leads:', err);
      setError('Falha ao carregar leads. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearch = (term) => {
    fetchLeads(term);
  };

  const handleUpdateLead = async (id, name, email) => {
    try {
      await api.put(`/admin/leads/${id}`, { name, email });
      fetchLeads();
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
      throw err;
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await api.delete(`/admin/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.error('Erro ao excluir lead:', err);
      setError('Falha ao excluir lead. Tente novamente.');
    }
  };

  const handleAddLead = async (name, email) => {
    try {
      await api.post(`/admin/leads`, { name, email });
      fetchLeads();
    } catch (err) {
      console.error('Erro ao adicionar lead:', err);
      throw err;
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /> Carregando leads...</div>;
  }

  return (
    <div>
      <h2>Gerenciamento de Leads</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <LeadTable
        leads={leads}
        onSearch={handleSearch}
        onUpdate={handleUpdateLead}
        onDelete={handleDeleteLead}
        onAdd={handleAddLead}
      />
    </div>
  );
};

export default AdminDashboard;