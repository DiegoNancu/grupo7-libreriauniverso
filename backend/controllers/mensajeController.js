const mensaje = require('../models/mensaje');

const createMensaje = (req, res) => {
  const { origen, destino, contenido, fecha } = req.body;
  if(!origen || !destino || !contenido || !fecha) return res.status(401).send({ message: 'Debe ingresar todos los datos.' });
  const newMensaje = new mensaje({
    origen,
    destino,
    contenido,
    fecha
  })
  newMensaje.save((error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al crear mensaje.' });
    return res.status(201).send(mensaje);
  });
}

const getMensaje = (req, res) => {
  const { id } = req.params;

  foro.find({ id }, (error, mensaje) => {
    if(error) return res.status(400).send({ message: 'Error al buscar mensaje.' });
    if(!mensaje) return res.status(404).send({ message: 'Mensaje no encontrado.' });
    return res.status(201).send(mensaje);
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
  updateMensaje,
  deleteMensaje,
}