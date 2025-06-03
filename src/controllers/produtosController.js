const produtosDAO = require("../models/produtosDAO.js");

const produtosController = {
    async findAll(req, res){
        try{
            const products = await produtosDAO.findAll();
            if(products.length === 0){
                return res.status(404).json([]);
            }
            res.json({products});
        }catch(error){
            console.error("Erro ao consultar o banco: ", error);
            res.status(500).json({ error: "Erro ao consultar o banco" });
        }
    },
    async create(req, res){
        const {nome, preco, estoque} = req.body;
        try{
            const product = await produtosDAO.create({nome, preco, estoque});
            res.status(201).json({product});

        }catch(error){
            console.error("Erro ao cadastrar produto: ", error);
            res.status(500).json({ error: "Erro ao cadastrar produto" });
        }
    },
    async update(req, res){
        const {id} = req.params;
        const {nome, preco, estoque} = req.body;
        try{
            const product = await produtosDAO.findId(id);
            if(!product){
                return res.status(404).json([]);
            }

            const result = await produtosDAO.update(id, {nome, preco, estoque});
            res.json({result});
        }catch(error){
            console.error("Erro ao atualizar produto: ", error);
            res.status(500).json({ error: "Erro ao atualizar produto" });
        }
    },
    async delete(req, res){
        const {id} = req.params;
        try{
            const product = await produtosDAO.findId(id);
            if(!product){
                return res.status(404).json([]);
            }

            const result = await produtosDAO.delete(id);
            res.json({result});
        }catch(error){
            console.error("Erro ao excluir produto: ", error);
            res.status(500).json({ error: "Erro ao excluir produto" });
        }
    }
}

module.exports = produtosController;