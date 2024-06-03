import cors from 'cors'

const ACEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3001',
    'http://localhost:3000',
    'http://192.168.1.167:3000'

]

export const corsMiddleware = ({acceptedOrigins = ACEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
        if(acceptedOrigins.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback(new Error('Not Allowed BY CORS'))
    },
    credentials: true
})