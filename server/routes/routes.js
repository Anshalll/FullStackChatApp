import express from 'express'
import { Index, VerifyRegister, Login, Register, ResetpassUrlGeneration, VerifyPassResetUrl, UpdatePassUrl, Logout, GoogleAuth , Getuserdata , UpdateExtras , Upload_dp , Upload_bg ,Delete_dp , Delete_bg , Searchprofile, Getauser , Followuser , unFollowuser , getfollowers , getfollowing} from '../controllers/index.js'

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


Router.get('/api/getdata' , ValidateUser , Getuserdata )
Router.post('/api/updatextras' , ValidateUser , UpdateExtras)
Router.post('/api/profiledp' , ValidateUser ,  Upload_dp)
Router.post('/api/profilebg' , ValidateUser, Upload_bg)
Router.delete('/api/deletedp' , ValidateUser , Delete_dp)
Router.delete('/api/deletebg' , ValidateUser , Delete_bg)
Router.post('/api/searchprofile' , ValidateUser , Searchprofile)
Router.post('/api/getauser' , ValidateUser , Getauser)
Router.post('/api/followuser' , ValidateUser , Followuser)
Router.post('/api/unfollowuser' , ValidateUser , unFollowuser)
Router.post('/api/getfollowers' , ValidateUser , getfollowers)
Router.post('/api/getfollowing' , ValidateUser , getfollowing)