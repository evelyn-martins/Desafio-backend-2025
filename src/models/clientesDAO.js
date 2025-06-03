const db = require("../config/db.js");

const clientesDAO = {
  async findAll() {
    const result = await db.query("SELECT * FROM clientes");
    return result.rows;
  },
  async create({ nome, telefone }) {
    const result = await db.query(
      "INSERT INTO clientes (nome, telefone) VALUES ($1, $2) RETURNING *",
      [nome, telefone]
    );
    return result.rows[0];
  },
  async update(id, { nome, telefone }) {
    const result = await db.query(
      "UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *",
      [nome, telefone, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query(
      "DELETE FROM clientes WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
  async findId(id){
    const result = await db.query("SELECT * FROM clientes WHERE id = $1", [id]);
    return result.rows[0];
  }
};

module.exports = clientesDAO;
