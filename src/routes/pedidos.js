const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController.js");

router.get("/", pedidosController.findAll);
router.post("/", pedidosController.create);
router.patch("/:id", pedidosController.update);

module.exports = router;
