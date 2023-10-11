const express = require('express');
const cors = require('cors');
const app = express();

var examen_routes = require('./routes/examen.routes');

// Configurar CORS
app.use(cors());

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));

// Rutas
app.use(examen_routes);
app.listen("3000");
console.log("Servidor Express en ejecución en el puerto 3000");