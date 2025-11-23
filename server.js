const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/database");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar BD (no crítico)
conectarBD();

// ✅ RUTAS CORRECTAS - SIN *
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/shipments', require("./routes/shipment.routes"));

// ✅ Ruta de salud simple
app.get('/api', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

// ✅ Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Envíos',
    endpoints: ['/api', '/api/customers', '/api/shipments']
  });
});

// ✅ Health check para Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// ✅ Manejo de rutas no encontradas (sin *)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});

module.exports = app;