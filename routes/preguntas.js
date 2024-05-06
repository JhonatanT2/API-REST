import { Router } from "express";
import { PreguntaController } from "../controllers/preguntas.js";

export const preguntasRouter = Router()

preguntasRouter.get('/', PreguntaController.getAll)

preguntasRouter.get('/:id', PreguntaController.getById)

preguntasRouter.post('/', PreguntaController.create)

preguntasRouter.delete('/:id', PreguntaController.delete)

preguntasRouter.patch('/:id', PreguntaController.update)