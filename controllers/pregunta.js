import { preguntaModel } from "../models/dbturso/pregunta.js";
import { validatePregunta } from "../schemas/pregunta.js";

export class preguntaController{
    static async create(req, res){
        const result = validatePregunta(req.body)
        if(result.error){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newPregunta = await preguntaModel.create({input: result.data})
        res.status(201).json(newPregunta)
    }
    static async getAll (req, res) {
        const preguntas = await preguntaModel.getAll()
        res.json(preguntas)
    }
    static async findById(req, res){
        try{
        const id = req.params.id
        const pregunta = await preguntaModel.findById(id)
        if (pregunta) return res.json(pregunta)
    
        res.status(404).json({message: 'Pregunta no encontrada'})
        } catch(error) {
            console.error('Error al buscar la pregunta:', error);
            res.status(500).send(error.message);
        }
    }
    static async getRespuestas(req, res){
        try{
            const preguntatId=req.params.id
            const respuestas = await preguntaModel.getRespuestas(preguntatId)
            if(respuestas) return res.json(respuestas)
            res.status(404).json({message: 'Respuestas de la pregunta no encontradas'})
        } catch(error){
            console.error('Error al buscar respuestas de la pregunta', error );
            res.status(500).send(error.message);
        }
    }
}