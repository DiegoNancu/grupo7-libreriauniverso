
const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({

    id_publicacion: [{
        type: moongose.Schema.Types.ObjectId,
        Ref: 'publicacion'
   }],
   rut: [{
    type: moongose.Schema.Types.ObjectId,
    Ref: 'usuario'
   }],
   
   precio: {
    type: Number,
    default: 0
   }


});
module.exports = mongoose.model('carrito', carritoSchema);