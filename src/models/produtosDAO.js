const db = require("../config/db.js");

const produtosDAO = {
    async findAll(){
        const result = await db.query("SELECT * FROM produtos");
        return result.rows;
    },
    async create({nome, preco, estoque}){
        const result = await db.query("INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *", [nome, preco, estoque]);
        return result.rows[0];
    },
    async update(id, {nome, preco, estoque}){
        const result = await db.query("UPDATE produtos SET nome = $1, preco = $2, estoque = $3 WHERE id = $4 RETURNING *", [nome, preco, estoque, id]);
        return result.rows[0];
    },
    async delete(id){
        const result = await db.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);
        return result.rows[0]
    },
    async findId(id){
        const result = await db.query("SELECT * FROM produtos WHERE id = $1", [id]);
        return result.rows[0];
    }
}

module.exports = produtosDAO;