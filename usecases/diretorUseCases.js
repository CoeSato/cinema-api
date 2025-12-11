const { pool } = require('../config');
const Diretor = require('../entities/diretor')

const getDiretoresDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM diretores ORDER BY codigo');
        return rows.map((diretor) => new Diretor(diretor.codigo, diretor.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addDiretorDB = async (body) => {
    try {   
        const { nome } = body;
        const results = await pool.query(`INSERT INTO diretores (nome)
            VALUES ($1)
            returning codigo, nome`,
        [nome]); 
        const diretor = results.rows[0]; 
        return new Diretor(diretor.codigo, diretor.nome); 
    } catch (err) {
        throw "Erro ao inserir diretor: " + err; 
    }    
}


const updateDiretorDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE diretores set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const diretor = results.rows[0];
        return new Diretor(diretor.codigo, diretor.nome); 
    } catch (err) {
        throw "Erro ao alterar diretor: " + err;
    }      
}

const deleteDiretorDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM diretores where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Diretor removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o diretor: " + err;
    }     
}

const getDiretorPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM diretores where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const diretor = results.rows[0];
            return new Diretor(diretor.codigo, diretor.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o diretor: " + err;
    }     
}

module.exports = {
    getDiretoresDB, addDiretorDB, updateDiretorDB, deleteDiretorDB, getDiretorPorCodigoDB
}