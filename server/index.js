import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {Router} from './routes/routes.js'
import bodyParser from 'body-parser'
import { Connect_db } from './database/db.js'
import {Deleteotps} from './utils/DeleteData.js'
import { ErrorHandler  } from './middleware/Errorhandler.js'
import passport from 'passport'
import { GoogleAuth } from './auth/GoogleAuth.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { AppRouter } from './routes/AppRoutes.js'
import path from 'path'
import fileUpload from 'express-fileupload'
import { Clientsockets } from './controllers/sockets.js'
import { Server } from 'socket.io'

import { createServer } from 'http'


dotenv.config({ path: '.env' })


const app = express()

const socketserver = createServer(app)

export const io = new Server(socketserver, {
    cors: {
        origin: '*',
        credentials: true, // Correct value
    },
});

Clientsockets()

app.use(express.static(path.join(path.resolve() , '/uploads')))

app.use(cookieParser())
app.use(fileUpload())
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true

}));

app.use(session({

    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
    
}))

Connect_db()

setInterval(() => {
    Deleteotps()

} , 1000)

app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
GoogleAuth()


app.use(ErrorHandler)
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/' , Router)
app.use('/api' , AppRouter)



socketserver.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});