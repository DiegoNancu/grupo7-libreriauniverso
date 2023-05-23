import { Schema, model } from "mongoose";
const schema = Schema;

const categoriaSchema = new schema({
  id_categoria: {
    type: String,
    required: true
  },
  costo: {
    type: String,
    required: true
  },
})

moudle.exports = model("categoria", categoriaSchema);