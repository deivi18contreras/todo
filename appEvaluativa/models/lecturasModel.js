import pool from "../config/mysql.js"


export async function crearLecturaPrincipal(usuario_id, contenido = "") {

    const fecha = new Date();

    const [result] = await pool.query(
        `
        INSERT INTO lecturas (usuario_id, tipo, contenido, fecha)
        VALUES (?, 'PRINCIPAL', ?, ?)
        `,
        [usuario_id, contenido, fecha]
    );

    const [usuario] = await pool.query(
        `SELECT * FROM usuarios WHERE id = ?`,
        [usuario_id]
    );

    return {
        id: result.insertId,
        usuario_id,
        usuario: usuario[0],
        tipo: "PRINCIPAL",
        contenido,
        fecha
    };
}

export async function crearLecturaDiaria(usuario_id, contenido = "") {

    const fecha = new Date();

    const [result] = await pool.query(
        `
        INSERT INTO lecturas (usuario_id, tipo, contenido, fecha)
        VALUES (?, 'DIARIA', ?, ?)
        `,
        [usuario_id, contenido, fecha]
    );

    const [usuario] = await pool.query(
        `SELECT * FROM usuarios WHERE id = ?`,
        [usuario_id]
    );

    return {
        id: result.insertId,
        usuario_id,
        usuario: usuario[0],
        tipo: "DIARIA",
        contenido,
        fecha
    };
}

export async function obtenerLecturaPorId(id){
  const [rows] = await pool.query('SELECT * FROM lecturas WHERE id = ?', [id]);
  return rows[0];
}
export async function ObtenerLecturasUsuario(usuario_id){
  const [rows] = await pool.query('SELECT * FROM lecturas WHERE usuario_id = ?',[usuario_id]);
  return rows[0];
}