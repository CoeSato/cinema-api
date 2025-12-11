const { pool } = require('../config');
const Serie = require('../entities/serie')

const getSeriesDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT s.codigo, s.nome, s.data_lancamento, s.qtd_temporadas, d.nome as diretor_nome 
            FROM series s
            INNER JOIN diretores d ON s.diretor_id = d.codigo
            ORDER BY s.codigo
        `);
        return rows.map((serie) => {
            const date = new Date(serie.data_lancamento);
            const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return new Serie(
                serie.codigo,
                serie.nome,
                formattedDate,
                serie.qtd_temporadas,
                serie.diretor_nome
            );
        });
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addSerieDB = async (body) => {
    try {
        const { nome, data_lancamento, qtd_temporadas, diretor_id } = body;
        const results = await pool.query(`INSERT INTO series (nome, data_lancamento, qtd_temporadas, diretor_id)
            VALUES ($1, $2, $3, $4)
            returning codigo, nome, data_lancamento, qtd_temporadas, diretor_id`,
            [nome, data_lancamento, qtd_temporadas, diretor_id]);
        const serie = results.rows[0];
        return new Serie(serie.codigo, serie.nome, serie.data_lancamento, serie.qtd_temporadas, serie.diretor_id);
    } catch (err) {
        throw "Erro ao inserir a série: " + err;
    }
}

const updateSerieDB = async (body) => {
    try {
        const { codigo, nome, data_lancamento, qtd_temporadas, diretor_id } = body;
        const results = await pool.query(`UPDATE series set nome = $2, data_lancamento = $3, qtd_temporadas = $4, diretor_id = $5 where codigo = $1 
            returning codigo, nome, data_lancamento, qtd_temporadas, diretor_id`,
            [codigo, nome, data_lancamento, qtd_temporadas, diretor_id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const serie = results.rows[0];
        return new Serie(serie.codigo, serie.nome, serie.data_lancamento, serie.qtd_temporadas, serie.diretor_id);
    } catch (err) {
        throw "Erro ao alterar o serie: " + err;
    }
}

const deleteSerieDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM series where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Série removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a série: " + err;
    }
}

const getSeriePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM series where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const serie = results.rows[0];
            return new Serie(serie.codigo, serie.nome, serie.data_lancamento, serie.qtd_temporadas, serie.diretor_id);
        }
    } catch (err) {
        throw "Erro ao consultar a série: " + err;
    }
}




module.exports = {
    getSeriesDB, addSerieDB, updateSerieDB, deleteSerieDB, getSeriePorCodigoDB
}