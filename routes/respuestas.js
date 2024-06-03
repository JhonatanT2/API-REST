import { Router } from "express";
import { respuestaController } from "../controllers/respuesta.js";

export const respuestaRouter = Router();

respuestaRouter.get('/',respuestaController.getAll);

respuestaRouter.get('/:id',respuestaController.findById);

respuestaRouter.post('/',respuestaController.create);