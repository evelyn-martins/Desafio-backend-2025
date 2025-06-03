const db = require("../config/db.js");

const pedidosDAO = {
    async findAll() {
        const result = await db.query(
            "SELECT pedidos.id AS pedido_id, clientes.nome AS cliente, pedidos.valor_total, string_agg(produtos.nome || ' (qtd: ' || pedido_produtos.quantidade || ')', ', ') AS produtos FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id INNER JOIN pedido_produtos ON pedidos.id = pedido_produtos.pedido_id INNER JOIN produtos ON pedido_produtos.produto_id = produtos.id GROUP BY pedidos.id, clientes.nome, pedidos.valor_total"
        );
        return result.rows;
    },
    async create({cliente_id, produtos}){
        let total_value = 0;
        for (const item of produtos) {
                const result = await db.query(
                "SELECT preco, estoque FROM produtos WHERE id = $1",
                [item.produto_id]
            );
            const product = result.rows[0];
            total_value += product.preco * item.quantidade;
        } 

        const result = await db.query(
            "INSERT INTO pedidos (cliente_id, valor_total) VALUES ($1, $2) RETURNING *",
            [cliente_id, total_value]
        );
        const orderId = result.rows[0].id;
        for (const item of produtos) {
            await db.query(
                "INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES ($1, $2, $3)",
                [orderId, item.produto_id, item.quantidade]
            );
            await db.query(
                "UPDATE produtos SET estoque = estoque - $1 WHERE id = $2",
                [item.quantidade, item.produto_id]
            );
        }
        return result.rows[0];
    },
    async update(id, {cliente_id, produtos}) {
        let total_value = 0;
        for (const item of produtos) {
            const result = await db.query(
                "SELECT preco, estoque FROM produtos WHERE id = $1",
                [item.produto_id]
            );
            const product = result.rows[0];
            total_value += product.preco * item.quantidade;
        }

        const result = await db.query(
            "UPDATE pedidos SET cliente_id = $1, valor_total = $2 WHERE id = $3 RETURNING *",
            [cliente_id, total_value, id]
        );

        await db.query("DELETE FROM pedido_produtos WHERE pedido_id = $1", [id]);
        for (const item of produtos) {
            await db.query(
                "INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES ($1, $2, $3)",
                [id, item.produto_id, item.quantidade]
            );
            await db.query(
                "UPDATE produtos SET estoque = estoque - $1 WHERE id = $2",
                [item.quantidade, item.produto_id]
            );
        }
        return result.rows[0];
    },
    async findId(id){
    const result = await db.query("SELECT * FROM pedidos WHERE id = $1", [id]);
    return result.rows[0];
  }
}

module.exports = pedidosDAO;