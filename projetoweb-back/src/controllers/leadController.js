const Lead = require('../models/leadModel');

exports.createLead = async (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'O nome é obrigatório e deve ser uma string não vazia.' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'O e-mail é obrigatório e deve ser um formato válido.' });
  }

  try {
    const newLead = await Lead.create(name, email);
    res.status(201).json({ message: 'Lead cadastrado com sucesso!', lead: newLead });
  } catch (error) {
    console.error('Erro ao cadastrar lead:', error);
    if (error.message === 'E-mail já cadastrado.') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar o lead.' });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    console.error('Erro ao listar leads:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao listar leads.' });
  }
};

exports.searchLeads = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Termo de busca (q) é obrigatório.' });
  }
  try {
    const leads = await Lead.search(q);
    res.json(leads);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar leads.' });
  }
};

exports.updateLead = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0 ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Nome e e-mail válidos são obrigatórios.' });
  }
  try {
    const updatedLead = await Lead.update(id, name, email);
    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    res.json({ message: 'Lead atualizado com sucesso!', lead: updatedLead });
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    if (error.message === 'E-mail já cadastrado para outro lead.') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar o lead.' });
  }
};

exports.deleteLead = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLead = await Lead.delete(id);
    if (!deletedLead) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    res.json({ message: 'Lead excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir lead:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir o lead.' });
  }
};