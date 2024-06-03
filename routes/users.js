import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { authenticate } from "../middlewares/auth.js";

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll);

usersRouter.get('/verify-email',UserController.verifyEmail);

usersRouter.post('/login',UserController.login);

usersRouter.post('/logout', UserController.logout);

usersRouter.get('/me', authenticate, UserController.getUserInfo);

usersRouter.get('/:id', UserController.findById);

usersRouter.post('/', UserController.register);





// usersRouter.post('/', UserController.create);