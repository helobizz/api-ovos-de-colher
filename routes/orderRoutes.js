import express from 'express';
import orderController from '../controllers/orderController.js';

const orderRoutes = express.Router();

import Auth from '../middleware/Auth.js';

orderRoutes.get("/orders", Auth.Authorization, orderController.getAllOrders);

orderRoutes.post("/orders", Auth.Authorization, orderController.createOrder);

orderRoutes.delete("/orders/:id", Auth.Authorization, orderController.deleteOrder);

orderRoutes.put("/orders/:id", Auth.Authorization, orderController.updateOrder);

orderRoutes.get("/orders/:id", Auth.Authorization, orderController.getOneOrder);

export default orderRoutes;