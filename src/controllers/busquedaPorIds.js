const { pociones } = require('../db/models/pociones');
const { ingredientes } = require('../db/models/ingredientes');

module.exports.busquedaIds = {

    //Localizar a una pocion segun su ID
    async getPocionById(id) {
        const pocionExistente = await pociones.findOne({
            where: {
                id: id
            }
        });
        return pocionExistente;
    },

    async getIngredienteById(id) {
        const ingredienteExistente = await ingredientes.findOne({
            where: {
                id: id
            }
        });
        return ingredienteExistente;
    }
}