const mensaje = require('../models/mensaje');

const createMensaje = (req, res) => {
  const { origen, destino, contenido } = req.body;
  if(!origen || !destino || !contenido) return res.status(401).send({ message: 'Debe ingresar todos los datos.' });
  const newMensaje = new mensaje({
    origen: origen,
    destino: destino,
    contenido: contenido,
    fecha: new Date()
  })

  newMensaje.save((error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al crear mensaje.' });
    return res.status(201).send(mensaje);
  });
}

const getMensaje = (req, res) => {
  const { id } = req.params;

  mensaje.find({ id }, (error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al buscar mensaje.' });
    if(!mensaje) return res.status(404).send({ message: 'Mensaje no encontrado.' });
    return res.status(201).send(mensaje);
  });
}

const getMensajes = (req, res) => {
  console.log(req.query);
  const { origen } = req.query;
  const destino = "00.000.000-0";

  mensaje.find({ $or: [ { origen, destino }, { origen: destino, destino: origen }, ], }, (error, mensajes) => {
    if(error) return res.status(400).send({ message: 'Error al buscar los mensajes.' });
    if(!mensajes) return res.status(404).send({ message: 'Mensajes no encontrados.' });
    return res.status(201).send(mensajes);
  });
}

const updateMensaje = (req, res) => {
  const { id } = req.params;

  mensaje.findByIdAndUpdate(id, req.body, (error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al actualizar mensaje.' });
    if(!mensaje) return res.status(404).send({ message: 'Mensaje no encontrado.' });
    return res.status(201).send({ message: 'Mensaje actualizado correctamente.', mensaje });
  })
}

const deleteMensaje = (req, res) => {
  const { id } = req.params;

  mensaje.findByIdAndDelete(id, (error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al eliminar mensaje.' });
    if(!mensaje) return res.status(404).send({ message: 'Mensaje no encontrado.' });
    return res.status(201).send({ message: 'Mensaje eliminado correctamente.' });
  })
}

module.exports = {
  createMensaje,
  getMensaje,
  getMensajes,
  updateMensaje,
  deleteMensaje,
}