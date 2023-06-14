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
    fecha_reclamo: {
        type: Date,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false,
        minLength: 11,
        maxLength: 500
    },
})

moudle.exports = mongoose.model("reclamos", userSchema);