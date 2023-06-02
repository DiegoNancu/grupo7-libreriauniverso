const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categoriaSchema = new schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("categoria", categoriaSchema);