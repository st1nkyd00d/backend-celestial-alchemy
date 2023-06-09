const express = require('express');
const apiRoutes = require('./src/routes/apiRoutes');
const body_parser = require('body-parser');
const cors = require('cors');
require('./src/db/conexion_db');

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log('Servidor backend conectado.');
})