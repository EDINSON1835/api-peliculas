const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { noEncontrada, manejarErrores } = require('./middlewares/errores');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    api: 'API Películas - IU Digital de Antioquia',
    endpoints: ['/api/generos', '/api/directores', '/api/productoras', '/api/tipos', '/api/media'],
  });
});

app.use('/api', routes);
app.use(noEncontrada);
app.use(manejarErrores);

module.exports = app;
