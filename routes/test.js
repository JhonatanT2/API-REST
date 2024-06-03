import { Router } from "express";
import { testController } from "../controllers/test.js";

export const testRouter = Router()

testRouter.get('/',testController.getAll);

testRouter.get('/:id',testController.findById);

testRouter.get('/tipo/:tipo',testController.findByType);

testRouter.get('/:id/preguntas',testController.getPreguntas);

testRouter.post('/',testController.create);