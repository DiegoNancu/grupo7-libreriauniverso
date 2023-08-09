const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const publicacionSchema = new Schema({
    id_publicacion: {
        type: String,
        required: true,
    },
    id_producto: {
        type: String,
        required: true,
    },
    nombre_tienda: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

module.export = mongoose.model("publicacion", publicacionSchema);