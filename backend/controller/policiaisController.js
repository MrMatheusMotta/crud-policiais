
const Policial = require('../models/policial');
const { encrypt, decrypt } = require('../services/cryptoService');
const { validarCPF } = require('../services/validationService'); // <-- ALTERADO para usar o novo validador

exports.cadastrar = async (req, res) => {
    console.log('--- O CÓDIGO NOVO FOI CARREGADO! CHEGUEI NA FUNÇÃO CADASTRAR. ---'); 
  try {
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;


    if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
      return res.status(400).json({ mensagem: 'Requisição inválida: Todos os campos são obrigatórios.' });
    }


    // if (!validarCPF(cpf)) {
    //   return res.status(400).json({ mensagem: 'Requisição inválida: O CPF informado é inválido.' });
    // }
    
    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    const policialExistente = await Policial.findByUniqueFields({ cpf, rg_civil, rg_militar });
    if (policialExistente) {
      return res.status(409).json({ mensagem: 'Conflito: CPF, RG Civil ou RG Militar já cadastrado.' }); // Status 409 Conflict é mais adequado aqui
    }

    const matriculaCriptografada = encrypt(matricula);

    const novoPolicial = await Policial.create({
      ...req.body,
      matricula: matriculaCriptografada
    });
    
    const resposta = { ...novoPolicial, matricula };

    return res.status(201).json(resposta);
  } catch (error) {
    console.error("Erro ao cadastrar policial:", error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

exports.listar = async (req, res) => {
  try {
    const { cpf, rg } = req.query; 
    const policiais = await Policial.findAll({ cpf, rg });

    const policiaisFormatados = policiais.map(policial => ({
      ...policial,
      matricula: decrypt(policial.matricula)
    }));

    return res.status(200).json(policiaisFormatados);
  } catch (error) {
    console.error("Erro ao listar policiais:", error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};