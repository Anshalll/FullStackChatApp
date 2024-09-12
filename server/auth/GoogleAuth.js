import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { GenerateUsername } from '../utils/GenerateVals.js'
import { RegisterModel } from '../models/registerModel.js'
export const GoogleAuth = () => {


    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:4000/google/auth/callback",
        scope: ["profile", "email"]

    },
        async function (accessToken, refreshToken, profile, done) {
            try {

                const { name, given_name, email } = profile._json
                const username = await GenerateUsername(given_name)
                let user = await RegisterModel.findOne({ email })
                if (!user) {
                  user =  await RegisterModel.create({ name , username , email })
                }
                return done(null, { id: user.id })

            } catch (error) {

                return done(error, null);
            }
        }



    ))


    passport.serializeUser(async (userid, done) => {
        const { id } = userid
        return done(null, id)
    })


    passport.deserializeUser(async (userid, done) => {
        try {

            const user = await RegisterModel.findById(userid);
            
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {

            done(error, false);
        }
    });


}
