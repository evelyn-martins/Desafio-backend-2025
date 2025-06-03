const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController.js");

router.get("/", clientesController.findAll);
router.post("/", clientesController.create);
router.put("/:id", clientesController.update);
router.delete("/:id", clientesController.delete);

module.exports = router;
