const { pociones } = require('../db/models/pociones');
const { busquedaIds } = require('./busquedaPorIds');

module.exports.pocionController = {

  //Funcion que busca las pociones
  async buscarPociones(req, res) {
    try {
      const listaPociones = await pociones.findAll();
      res.status(200).json(listaPociones);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al buscar las pociones' });
    }
  },

  //Funcion que agrega las pociones
  async agregarPocion(req, res) {
    try {
      const { nombre, categoria, precio, unidadesDisponibles, ingrediente1, ingrediente2, ingrediente3, ingrediente4, descripcion } = req.body;

      // Validacion para ver si hay al menos 2 ingredientes seleccionados
      const ingredientesSeleccionados = [ingrediente1, ingrediente2, ingrediente3, ingrediente4].filter(Boolean);
      if (ingredientesSeleccionados.length < 2) {
        return res.status(400).json('Debes seleccionar al menos 2 ingredientes');
      }

      // Obtener los ingredientes por su ID
      const ObjIngrediente1 = await busquedaIds.getIngredienteById(ingrediente1);
      const ObjIngrediente2 = await busquedaIds.getIngredienteById(ingrediente2);
      const ObjIngrediente3 = await busquedaIds.getIngredienteById(ingrediente3);
      const ObjIngrediente4 = await busquedaIds.getIngredienteById(ingrediente4);

      if (ObjIngrediente1 && ObjIngrediente1.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 1 se ha agotado');
      }
      if (ObjIngrediente2 && ObjIngrediente2.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 2 se ha agotado');
      }
      if (ObjIngrediente3 && ObjIngrediente3.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 3 se ha agotado');
      }
      if (ObjIngrediente4 && ObjIngrediente4.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 4 se ha agotado');
      }

      if (ObjIngrediente1) {
        ObjIngrediente1.unidadesDisponibles -= 1;
        await ObjIngrediente1.save();
      }
      if (ObjIngrediente2) {
        ObjIngrediente2.unidadesDisponibles -= 1;
        await ObjIngrediente2.save();
      }
      if (ObjIngrediente3) {
        ObjIngrediente3.unidadesDisponibles -= 1;
        await ObjIngrediente3.save();
      }
      if (ObjIngrediente4) {
        ObjIngrediente4.unidadesDisponibles -= 1;
        await ObjIngrediente4.save();
      }

      await pociones.create({
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        imagen: "1",
        unidadesDisponibles: unidadesDisponibles,
        ingrediente1: ObjIngrediente1 ? ObjIngrediente1.nombre : 'Sin ingrediente',
        ingrediente2: ObjIngrediente2 ? ObjIngrediente2.nombre : 'Sin ingrediente',
        ingrediente3: ObjIngrediente3 ? ObjIngrediente3.nombre : 'Sin ingrediente',
        ingrediente4: ObjIngrediente4 ? ObjIngrediente4.nombre : 'Sin ingrediente',
        descripcion: descripcion
      });

      res.status(200).json('Poción guardada con éxito');
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al agregar la poción' });
    }
  },

  //Funcion que edita las pociones
  async editarPocion(req, res) {
    try {
      const pocionExistente = await busquedaIds.getPocionById(req.body.id);
      if (!pocionExistente) {
        return res.status(404).json('Poción no encontrada');
      }

      const { nombre, categoria, precio, unidadesDisponibles, ingrediente1, ingrediente2, ingrediente3, ingrediente4, descripcion } = req.body;

      const ingredientesSeleccionados = [ingrediente1, ingrediente2, ingrediente3, ingrediente4].filter(Boolean);
      if (ingredientesSeleccionados.length < 2) {
        return res.status(400).json('Debes seleccionar al menos 2 ingredientes');
      }
      const ObjIngrediente1 = await busquedaIds.getIngredienteById(ingrediente1);
      const ObjIngrediente2 = await busquedaIds.getIngredienteById(ingrediente2);
      const ObjIngrediente3 = await busquedaIds.getIngredienteById(ingrediente3);
      const ObjIngrediente4 = await busquedaIds.getIngredienteById(ingrediente4);

      if (ObjIngrediente1 && ObjIngrediente1.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 1 se ha agotado');
      }
      if (ObjIngrediente2 && ObjIngrediente2.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 2 se ha agotado');
      }
      if (ObjIngrediente3 && ObjIngrediente3.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 3 se ha agotado');
      }
      if (ObjIngrediente4 && ObjIngrediente4.unidadesDisponibles === 0) {
        return res.status(400).json('El ingrediente 4 se ha agotado');
      }

      if (ObjIngrediente1) {
        ObjIngrediente1.unidadesDisponibles -= 1;
        await ObjIngrediente1.save();
      }
      if (ObjIngrediente2) {
        ObjIngrediente2.unidadesDisponibles -= 1;
        await ObjIngrediente2.save();
      }
      if (ObjIngrediente3) {
        ObjIngrediente3.unidadesDisponibles -= 1;
        await ObjIngrediente3.save();
      }
      if (ObjIngrediente4) {
        ObjIngrediente4.unidadesDisponibles -= 1;
        await ObjIngrediente4.save();
      }

      pocionExistente.nombre = nombre;
      pocionExistente.categoria = categoria;
      pocionExistente.precio = precio;
      pocionExistente.unidadesDisponibles = unidadesDisponibles;
      pocionExistente.ingrediente1 = ingrediente1 ?? "Sin ingrediente";
      pocionExistente.ingrediente2 = ingrediente2 ?? "Sin ingrediente";
      pocionExistente.ingrediente3 = ingrediente3 ?? "Sin ingrediente";
      pocionExistente.ingrediente4 = ingrediente4 ?? "Sin ingrediente";
      pocionExistente.descripcion = descripcion;

      await pocionExistente.save();
      res.status(200).json('Poción editada con éxito');
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Ocurrió un error al editar la poción' });
    }
  },

  async cambiarImagenPocion(req, res) {
    try {
      const pocionExistente = await busquedaIds.getPocionById(req.body.id);
      if (!pocionExistente) {
        return res.status(404).json('Poción no encontrada');
      }

      const { imagen } = req.body;
      pocionExistente.imagen = imagen;

      await pocionExistente.save();
      res.status(200).json('Imagen cambiada con éxito');
    } catch (error) {
      console.log(error)
      res.status(500).json('Ocurrió un error al cambiar la imagen de la poción');
    }
  }
  ,

  //Funcion que borra las pociones
  async borrarPocion(req, res) {
    try {
      const pocionExistente = await busquedaIds.getPocionById(req.body.id);
      if (!pocionExistente) {
        return res.status(404).json('Poción no encontrada');
      }
      await pocionExistente.destroy();
      res.status(200).json('Poción borrada con éxito');
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al borrar la poción' });
    }
  }
}
