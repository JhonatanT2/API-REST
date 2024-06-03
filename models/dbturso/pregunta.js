import 'dotenv/config';
import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class preguntaModel{
    static async create({input}){
        try {
            const result = await client.execute({
                sql: "INSERT INTO pregunta (enunciado, img, explication) VALUES (?, ?, ?)",
                args: [input.enunciado, input.img, input.explication],
            });
            return result;
        } catch (error) {
            console.error('Error al crear la pregunta:', error);
            throw error;
        }
    }
    static async getAll(){
        try {
            const result = await client.execute('SELECT * FROM pregunta');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener las preguntas:', error);
            throw error;
        }
    }
    static async findById(preguntaId){
        try {
            const preguntaResult = await client.execute({
                sql: 'SELECT * FROM pregunta WHERE id = ?',
                args: [preguntaId],
            });
            if (preguntaResult.rows.length === 0) {
                return null; // Devolver null si no se encuentra la pregunta
            }
            const pregunta = preguntaResult.rows[0];
            // Obtener las respuestas de la base de datos para esta pregunta
            const respuestasResult = await client.execute({
                sql: 'SELECT * FROM respuestas WHERE pregunta_id = ?',
                args: [preguntaId],
            });
            pregunta.respuestas = respuestasResult.rows;
            return pregunta;
        } catch (error) {
            console.error('Error al buscar la pregunta con este ID:', error);
            throw error;
        }
    }
    static async getRespuestas(preguntaId){
        console.log(preguntaId)
        try {
            const result = await client.execute({
                sql: 'SELECT * FROM respuestas WHERE pregunta_id = ?',
                args: [preguntaId],
            });
            return result.rows;
        } catch (error) {
            console.error('Error al obtener las respuestas:', error);
            throw error;
        }
    }
    static async delete(preguntaId) {
        const transaction = await client.transaction();
        try {
            //Primero borramos las respuestas asociadas a la pregunta
            await transaction.execute({
                sql: 'DELETE FROM respuestas WHERE pregunta_id = ?',
                args: [preguntaId],
            });
            //Luego borramos la pregunta
            await transaction.execute({
                sql: 'DELETE FROM pregunta WHERE id = ?',
                args: [preguntaId],
            });
            //Si todo va bien, confirmamos la transacción
            await transaction.commit();
            console.log(`Pregunta con id ${preguntaId} y sus respuestas han sido borradas.`);
        } catch (error) {
            //Si hay un error, revertimos la transacción
            await transaction.rollback();
            console.error('Error al borrar la pregunta y sus respuestas:', error);
            throw error;
        }
    }
}