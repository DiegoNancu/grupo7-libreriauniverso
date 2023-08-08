const express = require("express");
const api = express.Router();
const proController = require("../controllers/productController");

api.post('/addPro', proController.createProduct);
api.get('/listPro', proController.getProducts);
api.get('/getOneP/:nameP', proController.getOneP);
api.put('/updatePro/:id', proController.updateProducts);
api.delete('/deletePro/:id', proController.deleteProducts);
api.get('/listPro/search/:id', proController.getProductsById);

module.exports = api;