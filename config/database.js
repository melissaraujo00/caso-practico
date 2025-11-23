const mongoose = require("mongoose");

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.log("Error al conectar a MongoDB", error);
        process.exit(1)
    }
};

module.exports = conectarBD;     