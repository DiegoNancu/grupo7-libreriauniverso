const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mensajeSchema = new schema({
  origen: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 15,
  },
  destino: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 15,
  },
  contenido: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  fecha: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('mensaje', mensajeSchema);