const express = require("express");
const api = express.Router();
const proController = require("../controllers/productController");

api.post('/addPro', proController.createProduct);
api.get('/listPro', proController.getProducts);
api.put('/updatePro/:id', proController.updateProducts);
api.delete('/deletePro/:id', proController.deleteProducts);

module.exports = api;