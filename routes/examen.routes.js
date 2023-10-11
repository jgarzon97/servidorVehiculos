const { Router } = require('express');
const router = new Router();

var { getUsuario, getUsuarios, createUsuario, iniciarSesion } = require('../controllers/usuarios.controllers');
var { getVehiculos, createVehiculo, updateVehiculo, deleteVehiculo, buscarVehiculos } = require('../controllers/vehiculos.controllers') ;

// Rutas para los "Usuario"
router.get('/usuario/:id', getUsuario);
router.get('/usuarios', getUsuarios);
router.post('/usuario', createUsuario);
router.post('/iniciarSesion', iniciarSesion);

// Rutas para los "Vehiculo"
router.get('/vehiculos', getVehiculos);
router.post('/vehiculo', createVehiculo);
router.put('/vehiculo/:id', updateVehiculo);
router.delete('/vehiculo/:id', deleteVehiculo);
router.get('/buscar-vehiculos', buscarVehiculos);

module.exports = router;