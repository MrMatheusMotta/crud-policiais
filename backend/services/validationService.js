const { cpf } = require('cpf-cnpj-validator'); 

function validarCPF(numeroCpf) {
  return cpf.isValid(numeroCpf);
}

module.exports = { validarCPF };