import 'dotenv/config';
import { createClient } from "@libsql/client";
import { randomUUID } from 'node:crypto';

const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class testModel{
    static async create({input}) {      
        try {
            const testId = randomUUID();
            
            const result = await client.execute({
                sql: 'INSERT INTO test (id, description, tipo) VALUES (?, ?, ?)',
                args: [testId, input.description, input.tipo],
            });
            return result;
        } catch (error) {
            console.error('Error al crear el test:', error);
            throw error;
        }
    }
    static async getAll(){
        try {
            const result = await client.execute('SELECT * FROM test');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los test:', error);
            throw error;
        }
    }
    static async findByType(type){
        try{
            const result = await client.execute({
                sql: 'SELECT * FROM test WHERE tipo = ?',
                args: [type]
            });
            return result.rows;
        }catch(error){
            console.error('Error al obtener los test con ese Type:', error);
            throw error;
        }
    }
    static async findById(testId){
        try {
            const result = await client.execute({
                sql: 'SELECT * FROM test WHERE id = ?',
                args: [testId],
            });
            console.log()
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error al buscar el test con este ID:', error);
            throw error;
        }
    }
    static async getPreguntas(testId){
        console.log(testId)
        try {
            const preguntasResult = await client.execute({
                sql: 'SELECT * FROM pregunta WHERE test_id = ?',
                args: [testId],
            });
            if (preguntasResult.rows.length === 0) {
                return []; // devuelvo un arreglo vacio si no hay preguntas para el test
            }
            const preguntas = await Promise.all(preguntasResult.rows.map(async (pregunta) => {
                const respuestasResult = await client.execute({
                    sql: 'SELECT * FROM respuestas WHERE pregunta_id = ?',
                    args: [pregunta.id],
                });
                pregunta.respuestas = respuestasResult.rows;
                return pregunta;
            }));
    
            return preguntas;
        } catch (error) {
            console.error('Error al obtener las preguntas:', error);
            throw error;
        }
    }
}