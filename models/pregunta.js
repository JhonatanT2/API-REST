import { readJSON } from '../utils.js'
const preguntas = readJSON('./preguntas.json')
import { randomUUID } from 'node:crypto'

export class PreguntaModel {
    static async getAll ({tema}) {
        if(tema) {
            return preguntas.filter(
                //pregunta => pregunta.tema.some(g => g.toLowerCase() === genre.toLowerCase()) <-- Si fuese un array 
                pregunta => pregunta.tema.toLowerCase() === tema.toLowerCase()
            )
        }
        return preguntas
    }

    static async getById ({id}){
        const pregunta = preguntas.find(pregunta => pregunta.id == id)
        return pregunta
    }

    static async create ({input}){
        const newPregunta = {
            id: randomUUID(),
            ...input
        }
        preguntas.push(newPregunta)
        return newPregunta
    }

    static async delete ({ id }){
        const preguntaIndex = preguntas.findIndex(pregunta => pregunta.id == id)
        if (preguntaIndex == -1) return false

        preguntas.splice(preguntaIndex, 1)
        return true
    }

    static async update({ id, input}){
        const preguntaIndex = preguntas.findIndex( pregunta => pregunta.id == id)
        if (preguntaIndex == -1) return false

        preguntas[preguntaIndex]={
            ...preguntas[preguntaIndex],
            ...input
        }
        return preguntas[preguntaIndex]
    }
}