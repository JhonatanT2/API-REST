import { createClient } from "@libsql/client";
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});
export class UserModel{
    static async getAll () {
        try {
            const result = await client.execute('SELECT * FROM user');
            return result.rows; 
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }

    }
}