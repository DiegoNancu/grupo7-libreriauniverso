const express = require("express");
const comprasController = require("../controllers/comprasController");
const api = express.Router();

api.post("/createCompra", comprasController.createCompras);
api.get("/getComprasByUser/:id", comprasController.getComprasByUser);

module.exports = api;