const { DataTypes } = require('sequelize');
const { sequelize } = require('../config_db');

const pociones = sequelize.define('pociones', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    imagen: DataTypes.INTEGER,
    unidadesDisponibles: DataTypes.INTEGER,
    ingrediente1: DataTypes.STRING,
    ingrediente2: DataTypes.STRING,
    ingrediente3: DataTypes.STRING,
    ingrediente4: DataTypes.STRING,
    descripcion: DataTypes.STRING,
});


module.exports = {pociones}