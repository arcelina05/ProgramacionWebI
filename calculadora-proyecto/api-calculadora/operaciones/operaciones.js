/**
 * Sumar dos cantidades numéricas
 * @param {Number} a
 * @param {Number} b
 * @returns Number
 */

function division(a, b) {
  let peso = parseInt(a);
  let altura = parseFloat(b);
  return (peso / (altura * altura)) * 10000;
}

module.exports = {
  division,
};
