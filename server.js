const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/database");

const app = express();


app.use(cors());
app.use(express.json());

conectarBD();


app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/shipments', require("./routes/shipment.routes"));

app.get('/api', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Casi Practico',
    endpoints: [ '/api/customers', '/api/shipments']
  });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});

module.exports = app;