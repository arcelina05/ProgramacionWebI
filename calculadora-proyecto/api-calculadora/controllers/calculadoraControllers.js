const { division } = require("../operaciones/operaciones.js");

function Calcular(req, res) {
  const { body } = req;
  const { peso, altura } = body;
  const result = division(peso/ altura);
  res.json({
    resultado: result,
  });
}

module.exports = {
  Calcular,
};
