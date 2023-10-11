const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'examen',
    port: 5432,
});

//#region Usuario

async function getUsuarios(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Usuario');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM Usuario WHERE id_usuario = $1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createUsuario(req, res) {
    const { email, pass, nombre, apellido, id_rol, estado } = req.body;
    const query = 'INSERT INTO Usuario (email, pass, nombre, apellido, id_rol, estado) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [email, pass, nombre, apellido, id_rol, estado];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó con éxito el usuario' });
        } else {
            res.status(400).json({ message: 'No se guardó el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function iniciarSesion(req, res) {
    const { email, pass } = req.body;

    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM usuario WHERE email = $1';
        const result = await client.query(query, [email]);
        client.release();

        if (result.rows.length === 1) {
            const usuario = result.rows[0];
            if (usuario.pass === pass) {
                const { id_rol } = usuario; // Obtiene el valor de id_rol
                const { id_usuario } = usuario; // Obtiene el valor de id
                const { estado } = usuario; // Obtiene el estado
                const { nombre } = usuario; // Obtiene el estado
                const { apellido } = usuario; // Obtiene el estado

                res.status(200).json({ message: 'Inicio de sesión exitoso', id_rol, id_usuario, estado, nombre, apellido });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//#endregion

module.exports = {
    // Usuario
    getUsuarios,
    getUsuario,
    createUsuario,
    iniciarSesion
};