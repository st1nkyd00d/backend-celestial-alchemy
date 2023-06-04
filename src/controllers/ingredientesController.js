const { ingredientes } = require('../db/models/ingredientes');


module.exports.ingredientesController = {

    //Funcion para buscar todos los ingredientes
    async buscarIngredientes(req, res) {
        try {
            const listaIngredientes = await ingredientes.findAll();
            res.status(200).json(listaIngredientes);
        } catch (error) {
            res.status(500).json({ error: 'Ocurrió un error al buscar las pociones' });
        }
    }
}

