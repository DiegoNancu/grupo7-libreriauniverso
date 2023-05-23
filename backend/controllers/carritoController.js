const carrito = require("../models/carrito");


const createCarrito = async (req,res) => {

    try {
        const nuevoCarrito = await carrito.create({
           id_publicacion: req.body.carrito,
           rut: req.body.carrito
           
        });

    }catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
