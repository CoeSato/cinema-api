const { Router } = require('express');
const { rotasDiretores } = require('./rotasDiretores');
const { rotasFilmes } = require('./rotasFilmes');
const { rotasSeries } = require('./rotasSeries');
const { login, cadastro } = require('../controllers/segurancaController');
const { getUsuario, atualizaUsuario } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasDiretores, rotasFilmes, rotasSeries);

// rota para fazer o login e pegar o JWT
rotas.route("/login")
   .post(login) 
rotas.route("/cadastro") // rota para cadastro de usuário
   .post(cadastro)
rotas.route("/usuario")
   .get(verificaJWT, getUsuario)
   .put(verificaJWT, atualizaUsuario);

module.exports = { rotas };
