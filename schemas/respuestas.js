import z from 'zod'

const respuestaSchema = z.object({
    texto: z.string({
        required_error: 'El texto de la respuesta es requerido'
    }),
    texto: z.boolean({
        required_error: 'Es requerido marcar si es la respuesta correcta o no'
    })
});

export function validateRespuesta(object) {
    return respuestaSchema.safeParse(object)
}

export function validatePartialRespuesta(input) {
    return respuestaSchema.partial().safeParse(input)
}

