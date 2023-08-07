const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    id_user: {
        type: String,
        required: true
    },
    id_producto: {
        type: String,
        required: true
    },
    fecha_compra: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model("compras", userSchema);