const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conectarBD = require("./config/database");

dotenv.config();
conectarBD();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/shipments', require("./routes/shipment.routes"));

// Ruta de prueba para Vercel
app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando',
    endpoints: {
      customers: '/api/customers',
      shipments: '/api/shipments'
    }
  });
});

// Manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});