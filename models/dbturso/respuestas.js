import 'dotenv/config';
import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class respuestasModel{
    static async create({input}){
        try {
            const result = await client.execute({
                sql: "INSERT INTO respuestas (texto, correcta) VALUES (?, ?)",
                args: [input.texto, input.correcta],
            });
            return result;
        } catch (error) {
            console.error('Error al crear la respuesta:', error);
            throw error;
        }
    }
    static async getAll(){
        try {
            const result = await client.execute('SELECT * FROM respuestas');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener las respuestas:', error);
            throw error;
        }
    }
    static async findById(respuestataId){
        try {
            const result = await client.execute({
                sql: 'SELECT * FROM respuestas WHERE id = ?',
                args: [respuestataId],
            });
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error al buscar la respuesta con este ID:', error);
            throw error;
        }
    }
}