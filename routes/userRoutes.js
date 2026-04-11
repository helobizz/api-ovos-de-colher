import express from 'express';
const userRoutes = express.Router();

import Auth from '../middleware/Auth.js';

import userController from '../controllers/userController.js';

userRoutes.post("/users", Auth.Authorization, userController.createUser);

userRoutes.post("/auth", userController.loginUser)

userRoutes.delete("/users/:id", Auth.Authorization, userController.deleteUser);

userRoutes.put("/users/:id", Auth.Authorization, userController.updateUser);

export default userRoutes;