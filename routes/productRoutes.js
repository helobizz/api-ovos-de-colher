import express from 'express';
import productController from '../controllers/productController.js';

const productRoutes = express.Router();

import Auth from '../middleware/Auth.js'

productRoutes.get("/products", Auth.Authorization, productController.getAllProducts);

productRoutes.post("/products", Auth.Authorization, productController.createProduct);

productRoutes.delete("/products/:id", Auth.Authorization, productController.deleteProduct);

productRoutes.put("/products/:id", Auth.Authorization, productController.updateProduct);

productRoutes.get("/products/:id", Auth.Authorization, productController.getOneProduct);

export default productRoutes; 