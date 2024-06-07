import 'dotenv/config';
import { UserModel } from '../models/dbturso/user.js'
import { validatePartialUser, validateUser } from '../schemas/users.js'
import jwt from 'jsonwebtoken';


export class UserController{
    static async getAll (req, res) {
        const users = await UserModel.getAll()
        res.json(users)
    }

    static async findById(req, res){
        try{
        const id = req.params.id
        const user = await UserModel.findById(id)
        if (user) return res.json(user)
    
        res.status(404).json({message: 'Usuario no encontrado'})
        } catch(error) {
            console.error('Error al buscar el usuario:', error);
            res.status(500).send(error.message);
        }
    }
    static async register(req, res){
        try {
            const result = validateUser(req.body);
            if (result.error) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            // Registro el nuevo usuario y envio el correo de verificación
            const newUser = await UserModel.register({ input: result.data });
            // Se responde con el resultado de la operación
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ error: error.message });
        }
    }
    static async verifyEmail(req, res) {
        try {
            const token = req.query.token;
            if (!token) {
                return res.status(400).json({ error: 'Token is required' });
            }
            await UserModel.verifyEmail(token);
            res.send({ message: 'Email verified successfully.' });
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            res.status(500).json({ error: error.message });
        }
    }
    static async login (req, res) {
        try {
            const result = validatePartialUser(req.body);
            if (!result.success) {
                return res.status(400).json({ errors: validationResult.error.issues });
            }
    
            const { email, password } = result.data;
            const { message, token, user } = await UserModel.login({ email, password });
    
            // Configurar la cookie
            res.cookie('token', token, {
                httpOnly: true, // No accesible por JavaScript
                secure: process.env.NODE_ENV === 'production', // Solo en HTTPS
                sameSite: 'strict', // Evita CSRF
                maxAge: 3600000, // 1 hora
            });
    
            res.status(200).json({ message, user: { name: user.name, email: user.email, id: user.id } });
        } catch (error) {
            console.error("Error en API", error);
            res.status(400).json({ error: error.message });
        }
    };
    static async getUserInfo (req, res){
        try {
            const userId = req.user.userId; // Obtener el ID del usuario del token decodificado
            console.log("AQUI USER "+userId)
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error al buscar el usuario por ID:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
    static async logout (req, res){
        res.clearCookie('token'); // Eliminar la cookie que contiene el token
        res.status(200).json({ message: 'Logout successful' });
    }
    
}