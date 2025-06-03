const clientesDAO = require("../models/clientesDAO.js");

const clientesController = {
  async findAll(req, res) {
    try {
      const clients = await clientesDAO.findAll();
      if (clients.length === 0) {
        return res.status(404).json([]);
      }
      res.json({ clients });
    } catch (error) {
      console.error("Erro ao consultar o banco: ", error);
      res.status(500).json({ error: "Erro ao consultar o banco" });
    }
  },

  async create(req, res) {
    const { nome, telefone } = req.body;
    try {
      const client = await clientesDAO.create({ nome, telefone });
      res.status(201).json({ client });
    } catch (error) {
      console.error("Erro ao cadastrar cliente: ", error);
      res.status(500).json({ error: "Erro ao cadastrar cliente" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    try {
      const client = await clientesDAO.findId(id);
      if(!client){
        return res.status(404).json([]);
      }

      const result = await clientesDAO.update(id, { nome, telefone });
      res.json({ result });
    } catch (error) {
      console.error("Erro ao atualizar cliente: ", error);
      res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const client = await clientesDAO.findId(id);
      if(!client){
        return res.status(404).json([]);
      }

      const result = await clientesDAO.delete(id);
      res.json({ result });
    } catch (error) {
      console.error("Erro ao excluir cliente: ", error);
      res.status(500).json({ error: "Erro ao excluir cliente" });
    }
  },
};

module.exports = clientesController;
