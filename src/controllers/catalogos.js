const crudFactory = require('./crudFactory');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const Media = require('../models/Media');

// Cada catálogo no se puede borrar si alguna Media lo usa
const usadoEn = (campo) => async (id) => !!(await Media.exists({ [campo]: id }));

module.exports = {
  generos: crudFactory(Genero, { entidad: 'Género', enUso: usadoEn('genero') }),
  directores: crudFactory(Director, { entidad: 'Director', enUso: usadoEn('director') }),
  productoras: crudFactory(Productora, { entidad: 'Productora', enUso: usadoEn('productora') }),
  tipos: crudFactory(Tipo, { entidad: 'Tipo', enUso: usadoEn('tipo') }),
};
