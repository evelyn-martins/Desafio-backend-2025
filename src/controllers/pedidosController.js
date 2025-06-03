const clientesDAO = require("../models/clientesDAO.js");
const pedidosDAO = require("../models/pedidosDAO.js");
const produtosDAO = require("../models/produtosDAO.js");

const pedidosController = {
    async findAll(req, res){
        try{
            const result = await pedidosDAO.findAll();
            if(result.length === 0){
                return res.status(404).json([]);
            }
            res.json({result});
        }catch(error){
            console.error("Erro ao consultar o banco: ", error);
            res.status(500).json({ error: "Erro ao consultar o banco" });
        }
    },
    async create(req, res){
        const {cliente_id, produtos} = req.body;
        try{
            const client = await clientesDAO.findId(cliente_id);
            if(!client){
                return res.status(404).json([]);
            }

            for(const produto of produtos){
                const product = await produtosDAO.findId(produto.produto_id);
                if(!product){
                    return res.status(404).json([]);
                }
            }

            const result = await pedidosDAO.create({cliente_id, produtos});
            res.status(201).json({ result });
        }catch(error){
            console.error("Erro ao cadastrar pedido: ", error);
            res.status(500).json({ error: "Erro ao cadastrar pedido" });
        }
    },
    async update(req, res){
        try{
            const {id} = req.params;
            const {cliente_id, produtos} = req.body;

            const order = await pedidosDAO.findId(id);
            if(!order){
                return res.status(404).json([]);
            }

            const client = await clientesDAO.findId(cliente_id);
            if(!client){
                return res.status(404).json([]);
            }

            for(const produto of produtos){
                const product = await produtosDAO.findId(produto.produto_id);
                if(!product){
                    return res.status(404).json([]);
                }
            }

            const result = await pedidosDAO.update(id, {cliente_id, produtos});
            res.json({result});
        }catch(error){
            console.error("Erro ao atualizar pedido: ", error);
            res.status(500).json({ error: "Erro ao atualizar pedido" });
        }
    }
}

module.exports = pedidosController;