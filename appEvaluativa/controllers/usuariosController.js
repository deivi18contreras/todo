import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    actualizarEstadoUsuario,
    eliminarUsuario
}from '../models/usuariosModel.js';


export async function getUsuarios(req, res) {
    try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
    console.log("corriendo por ahora");
    } catch (error) {
    res.status(500).json({error: 'Error al obtener usuarios'})
    }
}

export async function getUsuario(req, res) {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}


export async function postUsuario(req, res) {
    try {
        const { nombre, email, fecha_nacimiento } = req.body;
        const nuevo = await crearUsuario(nombre, email, fecha_nacimiento);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}


export async function putUsuario(req, res) {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id)
        if (!usuario) return res.status(404).json({error: 'usuario no encontrado'})
        
        const actualizar = await actualizarUsuario(req.params.id, req.body)
        res.json(actualizar)
    } catch (error) {
        res.status(500).json({error: 'usuario no encontrado para actualizarlo'})
    }
}

export async function patchEstadoUsuario(req, res) {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id);

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const { estado } = req.body;

        const actualizado = await actualizarEstadoUsuario(req.params.id, estado);

        res.json(actualizado);

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar estado del usuario' });
    }
}


export async function deleteUsuario(req, res) {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const resultado = await eliminarUsuario(req.params.id);
    res.json(resultado);
  } catch (error) { 
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}