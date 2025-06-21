const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username
    `;
    const result = await pool.query(query, [username, hashedPassword]);
    return result.rows[0];
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async createAdminUser() {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existingUser = await this.findByUsername(username);
    if (!existingUser) {
      await this.create(username, password);
      console.log(`Usuário administrador '${username}' criado com sucesso.`);
    } else {
      console.log(`Usuário administrador '${username}' já existe.`);
    }
  }
}

module.exports = User;