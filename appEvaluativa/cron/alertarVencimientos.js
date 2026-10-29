import cron from 'node-cron';
import pool from '../config/mysql.js';

export function alertarVencimientos() {

  
  cron.schedule('0 5 * * *', async () => {
    console.log('📢 Buscando membresías próximas a vencer (1 día)...');

    try {
      const [usuarios] = await pool.query(`
        SELECT 
          u.id AS usuario_id,
          u.nombre,
          u.email,
          p.fecha_vencimiento
        FROM usuarios u
        INNER JOIN pagos p ON u.id = p.usuario_id
        WHERE p.fecha_vencimiento = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
      `);

      if (usuarios.length === 0) {
        console.log("⏳ No hay usuarios próximos a vencer.");
        return;
      }

      usuarios.forEach(user => {
        console.log(`
        🚨 AVISO DE VENCIMIENTO 🚨
        Usuario: ${user.nombre}
        Email: ${user.email}
        Su membresía vence el: ${user.fecha_vencimiento}
        `);
      });

    } catch (error) {
      console.error("❌ Error al buscar vencimientos:", error.message);
    }

  }, {
    timezone: "America/Bogota"
  });

  console.log("⏰ Cron programado: buscar vencimientos TODOS LOS DÍAS A LAS 12 PM");
}
