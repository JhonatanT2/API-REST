import z from 'zod'

const test_resultSchema = z.object({
    userId: z.string({
        required_error: 'El user ID es requerido',
        invalid_type_error: 'User ID debe ser de tipo string'
    }),
    testId: z.string({
        required_error: 'El test ID es requerido',
        invalid_type_error: 'Test ID debe ser de tipo string'
    }),
    score: z.number({
        required_error: 'El score es requerido',
        invalid_type_error: 'Score debe ser de tipo number'
    })
})

export function validateResult(object){
    return test_resultSchema.safeParse(object)
}
export function validatePartialResult(input){
    return test_resultSchema.partial.safeParse(input)
}