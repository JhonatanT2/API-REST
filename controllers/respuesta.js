import { respuestasModel } from "../models/dbturso/respuestas.js";
import { validateRespuesta } from "../schemas/respuestas.js";

export class respuestaController{
    static async create(req, res){
        const result = validateRespuesta(req.body)
        if(result.error){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newRespuesta = await respuestasModel.create({input: result.data})
        res.status(201).json(newRespuesta)
    }
    static async getAll (req, res) {
        const respuestas = await respuestasModel.getAll()
        res.json(respuestas)
    }
    static async findById(req, res){
        try{
        const id = req.params.id
        const respuesta = await respuestasModel.findById(id)
        if (respuesta) return res.json(respuesta)
    
        res.status(404).json({message: 'Respuesta no encontrada'})
        } catch(error) {
            console.error('Error al buscar la respuesta:', error);
            res.status(500).send(error.message);
        }
    }
}