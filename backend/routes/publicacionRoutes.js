const express = require("express");
const api = express.Router();
const publiController = require("../controllers/publicacionController");

api.post('/addPubli', publiController.createPublicacion);
api.get('/listPubli', publiController.getPublicacion);
api.put('/updatePubli/:id', publiController.updatePublicacion);
api.delete('/deletePubli/:id', publiController.deletePublicacion);
api.get('/getPubli/:id', publiController.getPublicacionById);

module.exports = api;