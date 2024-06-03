import { Router } from "express";
import { preguntaController } from "../controllers/pregunta.js";

export const preguntaRouter = Router();

preguntaRouter.get('/',preguntaController.getAll);

preguntaRouter.get('/:id',preguntaController.findById);

preguntaRouter.get('/:id/respuestas',preguntaController.getRespuestas);

preguntaRouter.post('/',preguntaController.create)

