import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import { env } from './src/config/env.js';
import { conectarMongo } from './src/config/db.js'; 
import { seedSystemConfigs } from './src/config/systemConfig.seed.js';
import authRoutes from './src/routes/auth.routes.js';
import usersRoutes from './src/routes/users.routes.js';
import companiesRoutes from './src/routes/companies.routes.js';
import systemConfigRoutes from './src/routes/systemConfig.routes.js';
import productiveStagesRoutes from './src/routes/productiveStages.routes.js';
import bitacorasRoutes from './src/routes/bitacoras.routes.js';
import trackingsRoutes from './src/routes/trackings.routes.js';
import hoursRoutes from './src/routes/hours.routes.js';
import documentsRoutes from './src/routes/documents.routes.js';

const app = express();

// Conectar a MongoDB Atlas
if (process.env.NODE_ENV !== 'test') {
    conectarMongo().then(() => {
        seedSystemConfigs();
    });
}

// Middlewares
app.use(cors());
app.use(morgan('dev')); 
app.use(express.json()); 

// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/system-config', systemConfigRoutes);
app.use('/api/productive-stages', productiveStagesRoutes);
app.use('/api/bitacoras', bitacorasRoutes);
app.use('/api/trackings', trackingsRoutes);
app.use('/api/hours', hoursRoutes);
app.use('/api/documents', documentsRoutes);

// Puerto y Listen
if (process.env.NODE_ENV !== 'test') {
    const PORT = env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
        console.log(`📂 Base de datos: Etapa Productiva`);
    });
}

export default app;