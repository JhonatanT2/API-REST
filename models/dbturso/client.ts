import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export class UserModel{
    static async getAll () {
        try {
            // Asume que 'execute' es un método que permite ejecutar consultas SQL
            // Reemplaza 'tableName' con el nombre real de tu tabla de usuarios
            const result = await client.execute('SELECT * FROM user');
            return result.rows; // Asume que 'rows' contiene los resultados de la consulta
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }

    }
}