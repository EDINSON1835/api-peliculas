const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const httpError = require('../middlewares/httpError');

const POPULATE = [
  { path: 'genero', select: 'nombre estado' },
  { path: 'director', select: 'nombres estado' },
  { path: 'productora', select: 'nombre estado' },
  { path: 'tipo', select: 'nombre' },
];

// Reglas del caso de estudio: solo se pueden asociar géneros, directores y
// productoras ACTIVOS, y tipos existentes.
async function validarRelaciones({ genero, director, productora, tipo }) {
  if (genero !== undefined) {
    const g = await Genero.findById(genero);
    if (!g) throw httpError(400, 'El género indicado no existe');
    if (g.estado !== 'Activo') throw httpError(400, 'El género indicado está Inactivo');
  }
  if (director !== undefined) {
    const d = await Director.findById(director);
    if (!d) throw httpError(400, 'El director indicado no existe');
    if (d.estado !== 'Activo') throw httpError(400, 'El director indicado está Inactivo');
  }
  if (productora !== undefined) {
    const p = await Productora.findById(productora);
    if (!p) throw httpError(400, 'La productora indicada no existe');
    if (p.estado !== 'Activo') throw httpError(400, 'La productora indicada está Inactiva');
  }
  if (tipo !== undefined) {
    if (!(await Tipo.exists({ _id: tipo }))) throw httpError(400, 'El tipo indicado no existe');
  }
}

const limpiar = (body) => {
  const { _id, fechaCreacion, fechaActualizacion, ...datos } = body || {};
  return datos;
};

exports.listar = async (req, res, next) => {
  try {
    const filtro = {};
    ['genero', 'director', 'productora', 'tipo', 'anioEstreno'].forEach((c) => {
      if (req.query[c]) filtro[c] = req.query[c];
    });
    if (req.query.titulo) filtro.titulo = new RegExp(String(req.query.titulo).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); // ?titulo=spider
    const docs = await Media.find(filtro).populate(POPULATE).sort({ fechaCreacion: -1 });
    res.json({ ok: true, total: docs.length, data: docs });
  } catch (e) { next(e); }
};

exports.obtener = async (req, res, next) => {
  try {
    const doc = await Media.findById(req.params.id).populate(POPULATE);
    if (!doc) throw httpError(404, 'Media no encontrada');
    res.json({ ok: true, data: doc });
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const datos = limpiar(req.body);
    await validarRelaciones({
      genero: datos.genero, director: datos.director, productora: datos.productora, tipo: datos.tipo,
    });
    const doc = await Media.create(datos);
    await doc.populate(POPULATE);
    res.status(201).json({ ok: true, mensaje: 'Media creada correctamente', data: doc });
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const doc = await Media.findById(req.params.id);
    if (!doc) throw httpError(404, 'Media no encontrada');
    const datos = limpiar(req.body);
    await validarRelaciones({
      genero: datos.genero, director: datos.director, productora: datos.productora, tipo: datos.tipo,
    });
    doc.set(datos);
    await doc.save();
    await doc.populate(POPULATE);
    res.json({ ok: true, mensaje: 'Media actualizada correctamente', data: doc });
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const doc = await Media.findById(req.params.id);
    if (!doc) throw httpError(404, 'Media no encontrada');
    await doc.deleteOne();
    res.json({ ok: true, mensaje: 'Media eliminada correctamente' });
  } catch (e) { next(e); }
};
