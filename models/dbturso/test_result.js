import 'dotenv/config';
import { createClient } from "@libsql/client";
import { randomUUID } from 'node:crypto';

const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class test_resultModel{
    static async create({ userId, testId, score }){
        try {
            const result = await client.execute({
                sql: 'INSERT INTO test_result (id, user_id, test_id, score) VALUES (?, ?, ?, ?)',
                args: [randomUUID(), userId, testId, score]
            });
            return result;
        } catch (error) {
            console.error('Error al registrar puntuación:', error);
            throw error;
        }
    }
    static async getAll(){
        try {
            const result = await client.execute('SELECT * FROM test_result');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los test_result:', error);
            throw error;
        }
    }
    static async getByUserId(userId) {
        try {
            const result = await client.execute({
                sql: 'SELECT * FROM test_result WHERE user_id = ?',
                args: [userId]
            });
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los test_result por userId:', error);
            throw error;
        }
    }
    static async getByUserIdAndTestId(userId, testId) {
        try {
          const result = await client.execute({
            sql: 'SELECT * FROM test_result WHERE user_id = ? AND test_id = ?',
            args: [userId, testId]
          });
          return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
          console.error('Error al obtener test_result por userId y testId:', error);
          throw error;
        }
      }
    static async updateScore({ id, score }) {
        console.log("AQUI"+id,score)
        try {
            const result = await client.execute({
                sql: 'UPDATE test_result SET score = ?, date_taken = CURRENT_TIMESTAMP WHERE id = ?',
                args: [score, id],
              });
            return result;
        } catch (error) {
            
            console.error('Error al actualizar el score:', error);
            throw error;
        }
    }
}
