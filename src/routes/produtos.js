const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController.js");

router.get("/", produtosController.findAll);
router.post("/", produtosController.create);
router.put("/:id", produtosController.update);
router.delete("/:id", produtosController.delete);

module.exports = router;
