import { testModel } from "../models/dbturso/test.js";
import { validateTest } from "../schemas/test.js";

export class testController{
    static async create(req, res){
        const result = validateTest(req.body)
        if(result.error){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newTest = await testModel.create({input: result.data})
        res.status(201).json(newTest)
    }
    static async getAll (req, res) {
        const tests = await testModel.getAll()
        res.json(tests)
    }
    static async findById(req, res){
        try{
        const id = req.params.id
        const test = await testModel.findById(id)
        if (test) return res.json(test)
    
        res.status(404).json({message: 'Test no encontrado'})
        } catch(error) {
            console.error('Error al buscar el test:', error);
            res.status(500).send(error.message);
        }
    }
    static async findByType(req, res){
        try{
            const type = req.params.tipo.toUpperCase();
            const tests = await testModel.findByType(type)
            if(tests) return res.json(tests)

            res.status(404).json({message: `Tests de tipo ${type} no encontrado`})
        } catch (error){
            console.error('Error al buscar el test de ese tipo:', error);
            res.status(500).send(error.message);
        }
    }
    static async getPreguntas(req, res){
        try{
            const testId=req.params.id
            const preguntas = await testModel.getPreguntas(testId)
            if(preguntas) return res.json(preguntas)
            res.status(404).json({message: 'Preguntas del test no encontradas'})
        } catch(error){
            console.error('Error al buscar preguntas del test', error );
            res.status(500).send(error.message);
        }
    }
}