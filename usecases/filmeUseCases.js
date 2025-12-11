const { pool } = require('../config');
const Filme = require('../entities/filme')

const getFilmesDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT f.codigo, f.nome, f.data_lancamento, d.nome as diretor_nome 
            FROM filmes f
            INNER JOIN diretores d ON f.diretor_id = d.codigo
            ORDER BY f.codigo
        `);
        return rows.map((filme) => {
            const date = new Date(filme.data_lancamento);
            const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return new Filme(
                filme.codigo,
                filme.nome,
                formattedDate,
                filme.diretor_nome
            );
        });
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addFilmeDB = async (body) => {
    try {
        const { nome, data_lancamento, diretor_id } = body;
        const results = await pool.query(`INSERT INTO filmes (nome, data_lancamento, diretor_id)
            VALUES ($1, $2, $3)
            returning codigo, nome, data_lancamento, diretor_id`,
            [nome, data_lancamento, diretor_id]);
        const filme = results.rows[0];
        return new Filme(filme.codigo, filme.nome, filme.data_lancamento, filme.diretor_id);
    } catch (err) {
        throw "Erro ao inserir o filme: " + err;
    }
}

const updateFilmeDB = async (body) => {
    try {
        const { codigo, nome, data_lancamento, diretor_id } = body;
        const results = await pool.query(`UPDATE filmes set nome = $2, data_lancamento = $3, diretor_id = $4 where codigo = $1 
            returning codigo, nome, data_lancamento, diretor_id`,
            [codigo, nome, data_lancamento, diretor_id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const filme = results.rows[0];
        return new Filme(filme.codigo, filme.nome, filme.data_lancamento, filme.diretor_id);
    } catch (err) {
        throw "Erro ao alterar o filme: " + err;
    }
}

const deleteFilmeDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM filmes where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Filme removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o filme: " + err;
    }
}

const getFilmePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM filmes where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const filme = results.rows[0];
            return new Filme(filme.codigo, filme.nome, filme.data_lancamento, filme.diretor_id);
        }
    } catch (err) {
        throw "Erro ao consultar o filme: " + err;
    }
}




module.exports = {
    getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorCodigoDB
}