const httpError = require('../middlewares/httpError');

// Quita campos que el cliente nunca debe poder fijar
const limpiar = (body) => {
  const { _id, fechaCreacion, fechaActualizacion, ...datos } = body || {};
  return datos;
};

/**
 * Genera los 5 handlers CRUD (listar, obtener, crear, actualizar, eliminar) de un modelo.
 * opciones.entidad   -> nombre legible (para mensajes)
 * opciones.enUso(id) -> función async que retorna true si el registro está referenciado (bloquea DELETE)
 */
module.exports = function crudFactory(Modelo, { entidad, enUso } = {}) {
  const buscarOError = async (id) => {
    const doc = await Modelo.findById(id);
    if (!doc) throw httpError(404, `${entidad} no encontrado(a)`);
    return doc;
  };

  return {
    listar: async (req, res, next) => {
      try {
        const filtro = {};
        if (req.query.estado) filtro.estado = req.query.estado; // ?estado=Activo
        const docs = await Modelo.find(filtro).sort({ fechaCreacion: -1 });
        res.json({ ok: true, total: docs.length, data: docs });
      } catch (e) { next(e); }
    },

    obtener: async (req, res, next) => {
      try {
        res.json({ ok: true, data: await buscarOError(req.params.id) });
      } catch (e) { next(e); }
    },

    crear: async (req, res, next) => {
      try {
        const doc = await Modelo.create(limpiar(req.body));
        res.status(201).json({ ok: true, mensaje: `${entidad} creado(a) correctamente`, data: doc });
      } catch (e) { next(e); }
    },

    actualizar: async (req, res, next) => {
      try {
        const doc = await buscarOError(req.params.id);
        doc.set(limpiar(req.body));
        await doc.save(); // ejecuta validaciones y actualiza fechaActualizacion
        res.json({ ok: true, mensaje: `${entidad} actualizado(a) correctamente`, data: doc });
      } catch (e) { next(e); }
    },

    eliminar: async (req, res, next) => {
      try {
        const doc = await buscarOError(req.params.id);
        if (enUso && (await enUso(doc._id))) {
          throw httpError(409, `No se puede eliminar: ${entidad} está asociado(a) a una o más producciones. Puedes marcarlo como Inactivo.`);
        }
        await doc.deleteOne();
        res.json({ ok: true, mensaje: `${entidad} eliminado(a) correctamente` });
      } catch (e) { next(e); }
    },
  };
};
