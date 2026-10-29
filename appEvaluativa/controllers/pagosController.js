import {
  obtenerPagos,
  obtenerUltimoPago,
  crearPago,
  actualizarPago,
} from "../models/pagosModel.js";


export async function getPagos(req, res) {
  try {
    const pagos = await obtenerPagos();
    res.json({  pagos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error al obtener los pagos" });
  }
}


export async function getPago(req, res) {
  try {
    const pago = await obtenerUltimoPago(req.params.usuario_id);

    if (!pago) {
      return res.status(404).json({
        ok: false,
        error: "No se encontró ningún pago para este usuario",
      });
    }

    res.json({  pago });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error al obtener el pago" });
  }
}


export async function postPago(req, res) {
  try {
    const { usuario_id, monto, metodo } = req.body;
    const nuevoPago = await crearPago(usuario_id, monto, metodo);

    res.status(201).json({ mensaje: "Pago realizado correctamente", pago: nuevoPago });
  } catch (error) {
    console.error(error);

    
    if (error.message.includes("membresía activa")) {
      return res.status(409).json({  error: "conflicto", mensaje: error.message });
    }

    res.status(500).json({ error: "Error al crear el nuevo pago" });
  }
}


export async function putPago(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body;

    const pagoActualizado = await actualizarPago(id, datos);

    if (!pagoActualizado) {
      return res.status(404).json({  error: "Pago no encontrado" });
    }

    res.json({  mensaje: "Pago actualizado correctamente", pago: pagoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
}


export async function getPagoEstado(req, res) {
  try {
    const pago = await obtenerUltimoPago(req.params.usuario_id);

    if (!pago) {
      return res.json({  estado: "inactivo", mensaje: "No tiene pagos registrados" });
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const venc = new Date(pago.fecha_vencimiento);
    venc.setHours(0, 0, 0, 0);

    const estado = venc >= hoy ? "activo" : "inactivo";

    res.json({
      ok: true,
      usuario_id: req.params.usuario_id,
      fecha_vencimiento: pago.fecha_vencimiento,
      estado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({  error: "Error al obtener el estado del usuario" });
  }
}
