const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'examen',
    port: 5432,
});

async function getVehiculos(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Vehiculo');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los Vehiculos:', error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createVehiculo(req, res) {
    const { codigo, placa, tipo_registro, descripcion, precio, anticipo, id_usuario } = req.body;
    const query = 'INSERT INTO Vehiculo (codigo, placa, tipo_registro, descripcion, precio, anticipo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [codigo, placa, tipo_registro, descripcion, precio, anticipo, id_usuario];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó con éxito el Vehiculo' });
        } else {
            res.status(400).json({ message: 'No se guardó el Vehiculo' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function updateVehiculo(req, res) {
    const { codigo, placa, tipo_registro, descripcion, precio, anticipo, id_usuario, id } = req.body;
    const query = 'UPDATE Vehiculo SET codigo = $1, placa = $2, tipo_registro = $3, descripcion = $4, precio = $5, anticipo = $6, id_usuario = $7 WHERE id_vehiculo = $8';
    const values = [codigo, placa, tipo_registro, descripcion, precio, anticipo, id_usuario, id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó con éxito el Vehiculo' });
        } else {
            res.status(400).json({ message: 'No se actualizó el Vehiculo' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function deleteVehiculo(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM Vehiculo WHERE id_vehiculo = $1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se eliminó con éxito el Vehiculo' });
        } else {
            res.status(400).json({ message: 'No se eliminó el Vehiculo' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function buscarVehiculos(req, res) {
    const { termino } = req.query;

    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM Vehiculo WHERE descripcion ILIKE $1';
        const result = await client.query(query, [`%${termino}%`]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Error al buscar vehículos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


module.exports = {
    getVehiculos,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    buscarVehiculos
};