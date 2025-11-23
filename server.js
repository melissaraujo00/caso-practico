const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conectarBD = require("./config/database");

dotenv.config();
conectarBD();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/shipments', require("./routes/shipment.routes"));

app.listen(3000, () =>{
    console.log('Servidor en http://localhost:3000');
})