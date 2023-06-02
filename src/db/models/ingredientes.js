const { DataTypes } = require('sequelize');
const { sequelize } = require('../config_db')

const ingredientes = sequelize.define('ingredientes', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    unidadesDisponibles: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
});


module.exports = {ingredientes}