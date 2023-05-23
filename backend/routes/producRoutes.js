import { Router } from 'express';
const router = Router();
import proController from '../controllers/productController';
const api = Router();

api.post('/add', proController.createProduct);
api.get('/list', proController.getProducts);
api.put('/update/:id', proController.updateProducts);
api.delete('/delete/:id', proController.deleteProducts);

module.exports = api;