// Carga los datos iniciales pedidos en el caso de estudio. Uso: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('./config/db');
const Genero = require('./models/Genero');
const Tipo = require('./models/Tipo');

(async () => {
  await conectarDB();
  for (const nombre of ['Acción', 'Aventura', 'Ciencia ficción', 'Drama', 'Terror']) {
    await Genero.updateOne({ nombre }, { $setOnInsert: { nombre, estado: 'Activo', descripcion: `Películas y series de ${nombre.toLowerCase()}` } }, { upsert: true });
  }
  for (const nombre of ['Película', 'Serie']) {
    await Tipo.updateOne({ nombre }, { $setOnInsert: { nombre, descripcion: `Producción tipo ${nombre.toLowerCase()}` } }, { upsert: true });
  }
  console.log('✔ Géneros y tipos iniciales cargados');
  await mongoose.disconnect();
})();
