const express = require("express");
const mensajeController = require("../controllers/mensajeController");
const api = express.Router();

api.post("/createMensaje", mensajeController.createMensaje);
api.get("/getMensaje/:id", mensajeController.getMensaje);
api.get("/getMensajes", mensajeController.getMensajes);
api.put("/updateMensaje/:id", mensajeController.updateMensaje);
api.delete("/delete/:id", mensajeController.deleteMensaje);

module.exports = api;