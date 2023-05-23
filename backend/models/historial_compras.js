const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    id_compras: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true
    },
    id_reclamos: {
        type: String,
        required: true
    },
})

moudle.exports = mongoose.model("historial_compras", userSchema);