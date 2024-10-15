import express from 'express'
import { Index, VerifyRegister, Login, Register, ResetpassUrlGeneration, VerifyPassResetUrl, UpdatePassUrl, Logout, GoogleAuth } from '../controllers/index.js'
import { ValidateUser } from '../middleware/ValidateUserMiddleware.js'
import { Recaptcha } from '../middleware/RecaptchaMiddleware.js'
import passport from 'passport'
export const Router = express.Router()


Router.get('/', ValidateUser,  Index),
Router.post('/verifyregister', Recaptcha, VerifyRegister),
Router.post('/login', Recaptcha, Login)
Router.post('/register', Recaptcha, Register)
Router.post('/reseturlgeneration', ResetpassUrlGeneration)
Router.post('/verifyresetpass', VerifyPassResetUrl)
Router.patch('/updatepassurl', UpdatePassUrl)

Router.get('/logout', Logout)
Router.get('/google/auth',   passport.authenticate("google", { scope: ["profile", "email"] }))
Router.get("/google/auth/callback", passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }) , GoogleAuth)