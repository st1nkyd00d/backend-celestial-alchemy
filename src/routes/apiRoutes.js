const express = require('express');
const router = express.Router();
const {pocionController} = require('../controllers/pocionController');
const { ingredientesController } = require('../controllers/ingredientesController');

//Rutas
//Ruta para obtener todas las pociones
router.get('/busquedaPociones', pocionController.buscarPociones);

//Ruta para obtener todos los ingredientes
router.get('/busquedaIngredientes', ingredientesController.buscarIngredientes);

//Ruta para agregar pociones
router.post('/agregarPocion', pocionController.agregarPocion);

//Ruta para editar pociones
router.put('/editarPocion', pocionController.editarPocion);

router.put('/cambiarImagen', pocionController.cambiarImagenPocion)

//Ruta para borrar pociones
router.delete('/eliminarPocion', pocionController.borrarPocion);

module.exports = router;