import { Schema, model } from "mongoose";
const schema = Schema;

const productoSchema = new schema({
  id_producto: {
    type: String,
    required: true
  },
  costo: {
    type: Number,
    required: true
  },
  precio_venta: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  id_categoria: [{
    type: moongose.Schema.Types.ObjectId,
    ref: "categoria"
  }]
})

moudle.exports = model("productos", productoSchema);