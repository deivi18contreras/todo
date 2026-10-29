import pool from "../config/mysql.js";
import { actualizarEstadoUsuario } from "./usuariosModel.js";


export async function obtenerPagos() {
    const [rows] = await pool.query('SELECT * FROM pagos');
    return rows;
}


export async function obtenerUltimoPago(usuario_id) {
    const [rows] = await pool.query(
        'SELECT * FROM pagos WHERE usuario_id = ? ORDER BY fecha_vencimiento DESC LIMIT 1',
        [usuario_id]
    );
    return rows[0];
}


export async function crearPago(usuario_id, monto, metodo) {
    
    const ultimoPago = await obtenerUltimoPago(usuario_id);
    const hoy = new Date();

    if (ultimoPago && new Date(ultimoPago.fecha_vencimiento) >= hoy) {
        throw new Error("Ya tienes una membresía activa. Puedes renovar cuando venza la actual.");
    }

   
    const [result] = await pool.query(
        `INSERT INTO pagos (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo)
         VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), ?)`,
        [usuario_id, monto, metodo]
    );

    await actualizarEstadoUsuario(usuario_id, 'activo');

    
    return {
        id: result.insertId,
        usuario_id,
        monto,
        metodo,
        fecha_pago: new Date().toISOString().split("T")[0],
        fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString().split("T")[0]
    };
}


export async function actualizarPago(id, datos) {
    const campos = [];
    const valores = [];

    for (const key in datos) {
        campos.push(`${key} = ?`);
        valores.push(datos[key]);
    }

    valores.push(id);

    const [result] = await pool.query(
        `UPDATE pagos SET ${campos.join(", ")} WHERE id = ?`,
        valores
    );

    return result.affectedRows > 0 ? { id, ...datos } : null;
}
