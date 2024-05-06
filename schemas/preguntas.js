import z from 'zod'

const respuestaSchema = z.object({
    id: z.string({
        required_error: 'El id de la respuesta es requerido'
    }),
    texto: z.string({
        required_error: 'El texto de la respuesta es requerido'
    })
});

const preguntaSchema = z.object({
    tema: z.string({
        invalid_type_error: 'Pregunta tema must be a string',
        required_error: 'el tema es requerido'
    }),
    enunciado: z.string({
        invalid_type_error: 'Enunciado debe ser un string',
        required_error: 'El enunciado es requerido'
    }),
    respuestas: z.array(respuestaSchema),
    respuesta_correcta: z.string()
    
})

export function validatePregunta(object) {
    return preguntaSchema.safeParse(object)
}

export function validatePartialPregunta(input) {
    return preguntaSchema.partial().safeParse(input)
}
