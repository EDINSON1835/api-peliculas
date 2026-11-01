const mongoose = require('mongoose');

async function conectarDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Falta la variable MONGO_URI en el archivo .env');
  await mongoose.connect(uri);
  console.log('✔ Conectado a MongoDB');
}

module.exports = conectarDB;
