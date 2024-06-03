import z from 'zod'

const preguntaSchema = z.object({
    enunciado: z.string({
        required_error: 'El enunciado es requerido',
        invalid_type_error: 'El enunciado debe ser de tipo String'
    }),
    img: z.string({
        invalid_type_error: 'La direccion de la imagen debe ser un String'
    }),
    explication: z.string({
        invalid_type_error: 'La explicacion debe ser un String'
    }),
})

export function validatePregunta(object) {
    return preguntaSchema.safeParse(object)
}

export function validatePartialPregunta(input) {
    return preguntaSchema.partial().safeParse(input)
}