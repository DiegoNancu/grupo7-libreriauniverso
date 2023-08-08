const compras = require("../models/compras")
const user = require("../models/users");

const createCompras = async (req, res) => {
    const { id_user, id_producto, fecha_compra} = req.body;
    /*const { id } = req.params;
    user.findById(id, (error, person) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if (!person) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }*/
        const newCompras = new compras({
            id_user,
            id_producto,
            fecha_compra,
        });
        console.log(newCompras);
        newCompras.save((error, NewCompras) => {
            if (error) {
                return res.status(400).send({ message: "Error al registrar la compra." });
            }
            try {
                return res.status(201).send(NewCompras);
            } catch (error) {
                console.log(error);
            }
        });
    //});
}

const getComprasByUser = (req, res) => {
    const { id } = req.params;
    user.findById( id, (error, person) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if (!person) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }
        compras.find( {id_user : id} , (err, compras) => {
            if (err) {
                return res.status(400).send({ mesage: "Error al obtener el historial de compras."})
            }
            if (!compras) {
                return res.status(404).send({ mesage: "Ninguna compra ha sido realizada."})
            }
            return res.status(201).send(compras);
        })
    })
}

module.exports = {
    createCompras,
    getComprasByUser,
}