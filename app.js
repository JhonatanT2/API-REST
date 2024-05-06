import express, { json } from 'express'
import { preguntasRouter } from './routes/preguntas.js'
import { corsMiddleware } from './middlewares/cors.js'


const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())


app.use('/preguntas', preguntasRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})