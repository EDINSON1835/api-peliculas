require('dotenv').config();
const app = require('./app');
const conectarDB = require('./config/db');

const PORT = process.env.PORT || 3000;

conectarDB()
  .then(() => app.listen(PORT, () => console.log(`✔ API escuchando en http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('✘ No se pudo iniciar:', err.message);
    process.exit(1);
  });
