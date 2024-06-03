import 'dotenv/config';
import { createClient } from "@libsql/client";
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from '../../middlewares/mailconfig.js';

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
    static async register({ input }) {
        try {
          //verificar si hay otro usuario con ese email
          const emailCheck = await client.execute({
            sql: 'SELECT * FROM user WHERE email = ?',
            args: [input.email],
          });
          if (emailCheck.rows.length > 0) {
              throw new Error('Este email ya esta registrado');
          }
          const userId = randomUUID();
          const passwordHash = await bcrypt.hash(input.password, saltRounds);
          const verificationToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });        
          await client.execute({
            sql: 'INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)',
            args: [userId, input.name, input.email, passwordHash],
          });  
          await sendVerificationEmail(input.email, verificationToken);      
          return { message: 'User registered. Verification email sent.' };
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
          throw error;
        }
    }
    static async verifyEmail(token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decoded.userId;  
          const result = await client.execute({
            sql: 'UPDATE user SET status = ? WHERE id = ?',
            args: ['VERIFIED', userId],
          }); 
          return result;
        } catch (error) {
          console.error('Error al verificar el correo electrónico:', error);
          throw error;
        }
    }
    static async login({ email, password }) {
      try {
          const result = await client.execute({
              sql: 'SELECT * FROM user WHERE email = ?',
              args: [email],
          });        
          if (result.rows.length === 0) {
              throw new Error('User not found');
          }
          const user = result.rows[0];
          if (user.status !== 'VERIFIED') {
            throw new Error('User not verified');
          }     
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              throw new Error('Invalid credentials');
          }
          // Genera un token JWT
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
          return { message: 'Login successful', token, user };
      } catch (error) {
          console.error('Error during login:', error);
          throw error;
      }
  }
}