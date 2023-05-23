const publi = require("../models/publicacion");
const publi = require("../models/publicacion");

const createPubli = (req, res) => {
    const { id_publicacion, id_producto, nombre_tienda, fecha, status, descripcion } = req.body;
    const newPublicacion = new publi({
    });
}