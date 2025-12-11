const { Router } = require('express');
const { getSeries, addSerie, updateSerie, deleteSerie, getSeriePorCodigo } = require('../controllers/serieController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasSeries = new Router();

rotasSeries.route('/serie')
   .get(verificaJWT, getSeries)
   .post(verificaJWT, addSerie)
   .put(verificaJWT, updateSerie)

rotasSeries.route('/serie/:codigo')
   .get(verificaJWT, getSeriePorCodigo)
   .delete(verificaJWT, deleteSerie)

module.exports = { rotasSeries };