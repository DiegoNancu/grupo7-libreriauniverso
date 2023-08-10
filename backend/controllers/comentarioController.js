const foro = require("../models/comentario");
const user = require("../models/users");

const createForo = (req, res) => {
    const { comment } = req.body;
    const { id, aid } = req.params;

    user.findById(id, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if(!person) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }
        const newForo = new foro({
            username: person.name,
            comment,
          productid: id,
    
        });
        newForo.save((error, foro) => {
            if(error) {
                return res.status(400).send({ message: "Error al crear un comentario." });
            }
            return res.status(201).send(foro);
        });
    });
};

const getForo = (req, res) => {
    const { productid } = req.params;

    foro.find({ productid }, (error, foro) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar foro." });
        }
        if(!foro) {
            return res.status(404).send({ message: "Foro no encontrado." });
        }
        return res.status(200).send(foro);
    });
};

const updateForo = (req, res) => {
    const { id, foroid } = req.params;

    foro.findById(foroid, (error, foroc) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar foro." });
        }
        if(!foroc) {
            return res.status(404).send({ message: "Foro no encontrado." });
        }
        if(foroc.productid === id) {
            foro.findByIdAndUpdate(foroid, req.body, (error, foro) => {
                if(error) {
                    return res.status(400).send({ message: "Error al buscar foro." });
                }
                if(!foro) {
                    return res.status(404).send({ message: "Foro no encontrado." });
                }
                return res.status(200).send({ message: "Foro actualizado." });
            });
        } else {
            return res.status(404).send({ message: "Usuario no permitido." })
        }
    });
};

const deleteForoAdmin = (req, res) => {
    const { id, foroid } = req.params;

    user.findById(id, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if(!person) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }
        if(person.rol === "administrador") {
            foro.findByIdAndDelete(foroid, (error, foro) => {
                if(error) {
                    return res.status(400).send({ message: "Error al buscar foro." });
                }
                if(!foro) {
                    return res.status(404).send({ message: "Foro no encontrado." });
                }
                return res.status(200).send({ message: "Foro eliminado." });
            });
        } else {
            return res.status(404).send({ message: "Usuario no permitido." })
        }
    });
};

const deleteForoUser = (req, res) => {
    const { id, foroid } = req.params;

    foro.findById(foroid, (error, foroc) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar foro." });
        }
        if(!foroc) {
            return res.status(404).send({ message: "Foro no encontrado." });
        }
        if(foroc.productid === id) {
            foro.findByIdAndDelete(foroid, (error, foro) => {
                if(error) {
                    return res.status(400).send({ message: "Error al buscar foro." });
                }
                if(!foro) {
                    return res.status(404).send({ message: "Foro no encontrado." });
                }
                return res.status(200).send({ message: "Foro eliminado." });
            });
        } else {
            return res.status(404).send({ message: "Usuario no permitido." })
        }
    });
};

module.exports = {
    createForo,
    getForo,
    updateForo,
    deleteForoAdmin,
    deleteForoUser,
};