const pool = require('../config/db');

class Lead {
  static async create(name, email) {
    const query = `
      INSERT INTO leads (name, email)
      VALUES ($1, $2)
      RETURNING id, name, email, created_at
    `;
    const values = [name, email];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('E-mail já cadastrado.');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM leads WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

    static async findAll() {
    const query = 'SELECT * FROM leads ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async search(searchTerm) {
    const query = `
      SELECT * FROM leads
      WHERE name ILIKE $1 OR email ILIKE $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  static async update(id, name, email) {
    const query = `
      UPDATE leads
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING id, name, email, created_at
    `;
    const values = [name, email, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('E-mail já cadastrado para outro lead.');
      }
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM leads WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

}

module.exports = Lead;