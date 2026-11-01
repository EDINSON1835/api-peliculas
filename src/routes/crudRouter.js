const { Router } = require('express');

module.exports = (c) => {
  const r = Router();
  r.route('/').get(c.listar).post(c.crear);
  r.route('/:id').get(c.obtener).put(c.actualizar).delete(c.eliminar);
  return r;
};
