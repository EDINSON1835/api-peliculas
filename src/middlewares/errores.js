const mongoose = require('mongoose');

// Ruta no encontrada
function noEncontrada(req, res) {
  res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// Manejador global de errores
function manejarErrores(err, req, res, next) {
  // Validaciones de Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    const errores = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ ok: false, mensaje: 'Error de validación', errores });
  }
  // ObjectId inválido
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ ok: false, mensaje: `Valor inválido para "${err.path}": ${err.value}` });
  }
  // Duplicados (índices unique)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ ok: false, mensaje: `Ya existe un registro con ese ${campo}: "${err.keyValue[campo]}"` });
  }
  // Errores controlados
  if (err.status) {
    return res.status(err.status).json({ ok: false, mensaje: err.message });
  }
  console.error(err);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
}

module.exports = { noEncontrada, manejarErrores };
