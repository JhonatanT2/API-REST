import z from 'zod'

const userSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    })
})

export function validateUser(object){
    return userSchema.safeParse(object)
}

export function validatePartialUser(object){
    return userSchema.partial().safeParse(object)
}