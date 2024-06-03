import z from 'zod'

const testSchema = z.object({
    description: z.string(),
    tipo: z.string(),
})

export function validateTest(object){
    return testSchema.safeParse(object)
}
export function validatePartialTest(input){
    return testSchema.partial().safeParse(input)
}