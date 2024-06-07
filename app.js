import express, { json } from 'express';
import { preguntasRouter } from './routes/preguntas.js';
import { usersRouter } from './routes/users.js';
import { corsMiddleware } from './middlewares/cors.js';
import { config } from 'dotenv';
import { testRouter } from './routes/test.js';
import { preguntaRouter } from './routes/pregunta.js';
import { respuestaRouter } from './routes/respuestas.js';
import { test_resultRouter } from './routes/test_result.js';
import cookieParser from 'cookie-parser';


config();
const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())
app.use(cookieParser());


app.use('/preguntas', preguntasRouter);
app.use('/pregunta', preguntaRouter);
app.use('/users', usersRouter);
app.use('/test',testRouter);
app.use('/respuestas',respuestaRouter);
app.use('/results',test_resultRouter);
app.use('/img', express.static('./img'));

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})