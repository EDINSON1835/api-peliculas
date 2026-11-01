const { Schema, model } = require('mongoose');

// El módulo Tipo NO maneja estado (según el caso de estudio)
const TipoSchema = new Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: true, trim: true },
    descripcion: { type: String, trim: true, default: '' },
  },
  { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }, versionKey: false }
);

module.exports = model('Tipo', TipoSchema);
