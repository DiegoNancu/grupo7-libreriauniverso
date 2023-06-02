const express = require("express");
const api = express.Router();
const catController = require("../controllers/categoriaController");

api.post('/addCat', catController.createCategory);
api.get('/listCat', catController.getCategories);
// api.put('/updatePro/:id', catController.updateProducts);
// api.delete('/deletePro/:id', catController.deleteProducts);

module.exports = api;