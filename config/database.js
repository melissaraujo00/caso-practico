const mongoose = require('mongoose');

const conectarBD = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno');
    }

    console.log('Intentando conectar a MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(` MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    throw error;
  }
};

module.exports = conectarBD;