const { Router } = require('express');
const { getFilmes, addFilme, updateFilme, deleteFilme, getFilmePorCodigo } = require('../controllers/filmeController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasFilmes = new Router();

rotasFilmes.route('/filme')
   .get(verificaJWT, getFilmes)
   .post(verificaJWT, addFilme)
   .put(verificaJWT, updateFilme)

rotasFilmes.route('/filme/:codigo')
   .get(verificaJWT, getFilmePorCodigo)
   .delete(verificaJWT, deleteFilme)

module.exports = { rotasFilmes };