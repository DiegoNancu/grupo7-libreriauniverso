const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  costo: {
    type: Number,
    required: true,
  },
  precio_venta: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  categoria: [{
    type: Schema.Types.ObjectId,
    ref: 'categoria'
  }]
});

module.exports = mongoose.model("productos", productoSchema);