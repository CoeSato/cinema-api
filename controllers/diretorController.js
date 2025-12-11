const { getDiretoresDB, addDiretorDB, updateDiretorDB, deleteDiretorDB, getDiretorPorCodigoDB } = require('../usecases/diretorUseCases')

const getDiretores = async (request, response) => {
    await getDiretoresDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar diretores : ' + err
        }));
}

const addDiretor = async (request, response) => {
    await addDiretorDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Diretor criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateDiretor = async (request, response) => {
    await updateDiretorDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Diretor alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteDiretor = async (request, response) => {
    await deleteDiretorDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getDiretorPorCodigo= async (request, response) => {
    await getDiretorPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getDiretores, addDiretor, updateDiretor, deleteDiretor, getDiretorPorCodigo
}