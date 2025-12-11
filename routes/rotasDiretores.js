const { Router } = require('express');
const { getDiretores, addDiretor, updateDiretor, deleteDiretor, getDiretorPorCodigo } = require('../controllers/diretorController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasDiretores = new Router();

rotasDiretores.route('/diretor')
   .get(verificaJWT, getDiretores)
   .post(verificaJWT, addDiretor)
   .put(verificaJWT, updateDiretor)


rotasDiretores.route('/diretor/:codigo')
   .get(verificaJWT, getDiretorPorCodigo)
   .delete(verificaJWT, deleteDiretor)

module.exports = { rotasDiretores };