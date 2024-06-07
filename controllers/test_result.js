import { test_resultModel } from "../models/dbturso/test_result.js";


export class test_resultController{
    static async create(req, res){
        try {
            const result = await test_resultModel.create({ input: req.body });
            res.status(201).json({
                message: 'Test result recorded successfully',
                data: result
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getAll(req, res){
        try {
            const test_results = await test_resultModel.getAll()
            res.status(200).json({
                test_results
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }      
    }
    static async getByUserId(req, res){
        try {
            const userId = req.params.userId;
            const results = await test_resultModel.getByUserId(userId);
            res.status(200).json(
                results
            );
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async updateResult(req, res){
        try {
            const { id, score } = req.body;
            const result = await test_resultModel.updateScore({ id, score });
            res.status(200).json({
                message: 'Puntuacion actualizada',
                data: result
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async updateOrCreateTestResult(req, res){
        const { userId, testId, score } = req.body;
        console.log("Datos recibidos:", { userId, testId, score });           
        try { 
            const existingResult = await test_resultModel.getByUserIdAndTestId(userId, testId);
            if (existingResult) {
                // Si ubiese tabla se actualiza
                const id=existingResult.id;
                await test_resultModel.updateScore({id, score});
            } else {
                // Se crea una nueva tabla 
                await test_resultModel.create({ userId, testId, score });
            }
            res.status(200).json({ message: 'Test result updated successfully' });
        } catch (error) {
            console.error('Error updating or creating test result:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getByUserAndTest(req,res){   
        try {
            const { userId, testId} = req.body;
            console.log(userId,testId)
            const results = await test_resultModel.getByUserIdAndTestId(userId,testId);
            res.status(200).json(
                results
            );
        } catch (error) {
            console.error('Error al el result:', error);
            res.status(500).send(error.message);
        }
    }
}