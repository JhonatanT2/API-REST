import 'dotenv/config';
import { createClient } from "@libsql/client";
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class UserModel{
    static async getAll () {
        try {
            //Uso 'execute', método que permite ejecutar consultas SQL
            const result = await client.execute('SELECT * FROM user');
            return result.rows; //'rows' contiene los resultados de la consulta
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }

    }
    static async findById(userId) {
        try {
            console.log(userId)
            const result = await client.execute({
                sql: 'SELECT * FROM user WHERE id = ?',
                args: [userId],
            });
            console.log()
            // 'rows' contiene los resultados de la consulta
            // en este caso el primero del arreglo
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error al buscar el usuario por ID:', error);
            throw error;
        }
    }
    static async create({input}) {      
        try {
            const userId = randomUUID();
            const passwordHash = await bcrypt.hash(input.password, saltRounds);
            
            const result = await client.execute({
                sql: 'INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)',
                args: [userId, input.name, input.email, passwordHash],
            });
            return result; // Devuelvo la confirmación de la inserción
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }
}