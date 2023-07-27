const publicacion = require("../models/publicacion");

const createPublicacion = (req, res) => {
    const { id_publicacion, id_producto, nombre_tienda, fecha, status, descripcion } = req.body;

    if (!id_publicacion || !id_producto || !nombre_tienda || !fecha || !status || !descripcion) {
        return res.status(400).send({
            message: "Todos los campos son obligatorios"
        });
    }
    const newPublicacion = new publicacionSchema({
        id_publicacion,
        id_producto,
        nombre_tienda,
        fecha,
        status,
        descripcion
    });

    newPublicacion.save((err, publicacionSaved) => {

        if (err) {
            return res.status(400).send({ message: "Error al guardar la publicacion" });
        }
        return res.status(201).send({
            message: "Publicacion realizada",
            publicacionSaved
        })
    });
}

const getPublicacion = (req, res) => {
    publicacion.find({}, (err, publi) => {
        if (err) {
        return res.status(400).send({ message: "Error al obtener las publicaciones" });
        }
        res.status(200).send({ publi });
        });
    };

const updatePublicacion = (req, res) => {
    const { id } = req.params;
    publicacion.findByIdAndUpdate(id, req.body, (err, publicacionUpdated) => {
        if (err) {
            return res.status(400).send({ message: "Error al actualizar la publicacion" });
        }
        if (!publicacionUpdated) {
            return res.status(404).send({ message: "Publicacion no encontrada" });
        }
        return res.status(200).send({ message: "Publicacion actualizada" });
        });
    }

const deletePublicacion = (req, res) => {
    const { id } = req.params;
    publicacion.findByIdAndDelete(id, (err, publicacionDeleted) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar la publicacion" });
        }
        if (!publicacionDeleted) {
            return res.status(404).send({ message: "Publicacion no encontrada" });
        }
        return res.status(200).send({ message: "Publicacion eliminada" });
        });
    }

const getPublicacionById = (req, res) => {
    const { id } = req.params;
    publicacion.findById(id, (err, publicacionbyid) => {
        if (err) {
            return res.status(400).send({ message: "Error en encontrar publicaciones"})
        }
        if (!publicacionbyid) {
            return res.status(404).send({ message: "Publicaciones no encontradas"})
        }
        return res.status(200).send(publicacionbyid);
    })
}

    module.exports = {
        createPublicacion,
        getPublicacion,
        updatePublicacion,
        deletePublicacion,
        getPublicacionById
    };