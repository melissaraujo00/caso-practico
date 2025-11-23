const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conectarBD = require("./config/database");

// Configurar dotenv solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a BD
conectarBD().catch(error => {
  console.error('Error conectando a MongoDB:', error);
});

// Rutas
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/shipments', require("./routes/shipment.routes"));

// Ruta de salud
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Caso Práctico',
    version: '1.0.0',
    endpoints: [
      '/api/customers',
      '/api/shipments'
    ]
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;