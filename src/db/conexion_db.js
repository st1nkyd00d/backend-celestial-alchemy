const mysql = require('mysql2/promise');
const { sequelize } = require('./config_db');
const { pociones } = require('./models/pociones');
const { ingredientes } = require('./models/ingredientes');
const ingredientesData = [
    {
        nombre: "Escama de dragón ígneo",
        unidadesDisponibles: 10,
        descripcion: "Una escama escarlata de un dragón de fuego que irradia calor y poder."
    },
    {
        nombre: "Lágrima de fénix",
        unidadesDisponibles: 10,
        descripcion: "Una joya resplandeciente que se forma cuando un fénix llora lágrimas curativas."
    },
    {
        nombre: "Raíz de árbol centenario",
        unidadesDisponibles: 5,
        descripcion: "Una raíz retorcida y resistente que proviene de un antiguo árbol de gran poder."
    },
    {
        nombre: "Polen de luna plateada",
        unidadesDisponibles: 5,
        descripcion: "Un polvo luminoso que se desprende de flores nocturnas bañadas por la luz de la luna."
    },
    {
        nombre: "Esencia de estrella fugaz",
        unidadesDisponibles: 1,
        descripcion: "Un líquido resplandeciente que se obtiene de una estrella fugaz y posee propiedades mágicas."
    },
    {
        nombre: "Flor de fuego eterno",
        unidadesDisponibles: 5,
        descripcion: "Una hermosa y rara flor que arde constantemente, proporcionando una luz cálida y poderosa."
    },
    {
        nombre: "Pluma de grifo dorado",
        unidadesDisponibles: 5,
        descripcion: "Una pluma dorada y brillante de un majestuoso grifo, símbolo de sabiduría y nobleza."
    },
    {
        nombre: "Hongo relámpago",
        unidadesDisponibles: 100,
        descripcion: "Un hongo bioluminiscente que, al ser aplastado, emite destellos eléctricos y brillantes."
    },
    {
        nombre: "Sangre de basilisco",
        unidadesDisponibles: 10,
        descripcion: "Un líquido venenoso y corrosivo extraído de un basilisco, criatura temida por su mirada letal."
    }
];

function conexionDb() {
    mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    })
        .then((connection) => {  // Creando la base de datos
            connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`).then(() => {
                console.log('Base de datos creada exitosamente');
            })
        })
        .then(() => { // Creando la conexion a la base de datos
            sequelize.authenticate().then(() => {
                console.log('La conexion a la base de datos se ha realizado exitosamente');
            })
        })
        .then(() => { // Se crea la tabla 'pociones'
            pociones.sync({ force: false })
                .then(() => console.log('Tabla de pociones creada en la BD'))
        })
        .then(() => {
            ingredientes.sync({ force: false })
                .then(() => {
                    console.log('Tabla de ingredientes creada en la BD');
                    return ingredientes.count();
                })
                .then((count) => {
                    if (count === 0) {
                        return ingredientes.bulkCreate(ingredientesData);
                    } else {
                        return Promise.resolve();
                    }
                })
                .catch((error) => {
                    console.log('Error al crear la tabla de ingredientes: ', error);
                });
        })


        .catch((error) => {
            console.log('Incapaz de conectar a la base de datos: ', error.message);
        });
}

conexionDb();