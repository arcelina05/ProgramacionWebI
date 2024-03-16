const express = require("express");
const router = express.Router();
const calculadoraControllers = require("../controllers/calculadoraControllers.js");

router.post("/Calcular", calculadoraControllers.Calcular);

module.exports = router;
