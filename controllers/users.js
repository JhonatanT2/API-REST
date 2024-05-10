import { UserModel } from '../models/dbturso/user.js'
import { validateUser } from '../schemas/users.js'

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

    static async create (req, res){
        const result = validateUser(req.body)

        if(result.error){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newUser = await UserModel.create({ input: result.data})
        res.status(201).json(newUser)
    }
}