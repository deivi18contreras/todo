import pool from "../config/mysql.js";

export async function obtenerUsuarios() {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  return rows;
}

export async function obtenerUsuarioPorId(id) {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
}

export async function crearUsuario(nombre, email, fecha_nacimiento, estado = "inactivo") {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, email, fecha_nacimiento, estado) VALUES (?, ?, ?, ?)",
    [nombre, email, fecha_nacimiento, estado]
  );
  return { id: result.insertId, nombre, email, fecha_nacimiento, estado };
}

export async function actualizarUsuario(id, data) {
  const { nombre, email, fecha_nacimiento, estado } = data;

  await pool.query(
    "UPDATE usuarios SET nombre = ?, email = ?, fecha_nacimiento = ?, estado = ? WHERE id = ?",
    [nombre, email, fecha_nacimiento, estado, id]
  );

  return { id, ...data };
}
export async function actualizarEstadoUsuario(id, estado) {
    const [result] = await pool.query(
        'UPDATE usuarios SET estado = ? WHERE id = ?',
        [estado, id]
    );

    return  result[0]
}


export async function eliminarUsuario(id) {
  await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return { mensaje: "Usuario eliminado" };
}
