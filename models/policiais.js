// models/Policial.js
const db = require('../config/database');

class Policial {
  static async create(novoPolicial) {
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = novoPolicial;
    const sql = 'INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [rg_civil, rg_militar, cpf, data_nascimento, matricula]);
    return { id: result.insertId, ...novoPolicial };
  }

  static async findAll(filters = {}) {
    let sql = 'SELECT * FROM policiais';
    const params = [];
    const whereClauses = [];

    if (filters.cpf) {
      whereClauses.push('cpf = ?');
      params.push(filters.cpf);
    }
    
    if (filters.rg) {
     
      whereClauses.push('(rg_civil = ? OR rg_militar = ?)');
      params.push(filters.rg, filters.rg);
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    const [rows] = await db.query(sql, params);
    return rows;
  }
  
  static async findByUniqueFields({ cpf, rg_civil, rg_militar }) {
    const sql = 'SELECT * FROM policiais WHERE cpf = ? OR rg_civil = ? OR rg_militar = ?';
    const [rows] = await db.query(sql, [cpf, rg_civil, rg_militar]);
    return rows[0];
  }
}

module.exports = Policial;