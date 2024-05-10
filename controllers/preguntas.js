import { validatePregunta, validatePartialPregunta } from '../schemas/preguntas.js'
import { PreguntaModel } from '../models/pregunta.js'


export class PreguntaController {
    static async getAll (req, res) {
        const { tema } = req.query
        const preguntas = await PreguntaModel.getAll({ tema })
        res.json(preguntas)
    }

    static async getById (req, res) {
        const {id} = req.params
        const pregunta = await PreguntaModel.getById({id})
        if (pregunta) return res.json(pregunta)
    
        res.status(404).json({message: 'Pregunta not found'})
    }

    static async create (req, res) {
        const result = validatePregunta(req.body)  
        if(result.error){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newPregunta = await PreguntaModel.create({ input: result.data})        
        res.status(201).json(newPregunta)
    }

    static async delete (req, res) {
        const { id } = req.params
        const result = await PreguntaModel.delete({id})
    
        if (result == false) {
            return res.status(404).json({ message: 'Movie not found'})
        }
        return res.json({ message: 'Movie deleted'})
    }
    static async update (req, res) {
        const result = validatePartialPregunta(req.body)
    
        if(!result.success){
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
        const updatedPregunta = await PreguntaModel.update({ id, input: result.data})
    
        return res.json(updatedPregunta)    
    }
}