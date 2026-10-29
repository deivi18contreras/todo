import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from './src/config/env.js';
import User from './src/models/User.model.js';

// Si no funciona el import de env, configuraremos manualmente dotenv:
import dotenv from 'dotenv';
dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a la base de datos.');

    // Datos del administrador base
    const adminData = {
      nationalId: '1234567890',
      fullName: 'Administrador Principal',
      email: 'admin@repfora.edu.co',
      password: 'AdminPassword123!',
      role: 'ADMIN',
      firstLogin: true // La primera vez que inicie sesión, le pedirá cambiarla
    };

    // Verificar si ya existe
    const existingAdmin = await User.findOne({ 
      $or: [{ email: adminData.email }, { nationalId: adminData.nationalId }] 
    });

    if (existingAdmin) {
      console.log('⚠️ Ya existe un usuario con este correo o documento.');
      console.log(`Documento: ${existingAdmin.nationalId}`);
      console.log(`Email: ${existingAdmin.email}`);
    } else {
      // Encriptar contraseña y crear
      const salt = await bcrypt.genSalt(10);
      adminData.password = await bcrypt.hash(adminData.password, salt);

      const newAdmin = new User(adminData);
      await newAdmin.save();

      console.log('🚀 ADMINISTRADOR CREADO CON ÉXITO:');
      console.log(`National ID (Login): 1234567890`);
      console.log(`Password inicial: AdminPassword123!`);
      console.log(`Nota: Al iniciar sesión en Postman te pedirá cambiarla (firstLogin = true)`);
    }

  } catch (error) {
    console.error('❌ Error ejecutando el seed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAdmin();
