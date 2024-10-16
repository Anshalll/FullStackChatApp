import ValidateRegister from '../utils/Validators.js'
import { RegisterModel } from '../models/registerModel.js'
import bcrypt from 'bcrypt'
import { otpModel } from '../models/otp.js'
import MailedData from '../utils/RegisterMailData.js'
import { VerifyOtp } from '../utils/Verifyemails.js'
import { setCookie } from '../shared/setCookie.js'
import { CheckFields } from '../shared/CheckFields.js'
import { ResetpassModel } from '../models/ResetpassModel.js'
import { verifyPassUri } from '../utils/VerifyresetPassuri.js'
import { ValidatePassword } from '../utils/Passwordvalidator.js'
import { UserExtrasModel } from '../models/AppModel.js' 


export const Index = async (req, res) => {

    const {id} = req
  
    const user = await RegisterModel.findById(id).select('-password')




    const extradata = await UserExtrasModel.findOne({ belongsto: user._id })
    .populate('belongsto')  
    .populate({
      path: 'followers',  
      populate: [{ path: 'belongsto' }, {path: "following"} , {path: "followers"} ],
 
    })
    .populate({
        path: 'following',  
        populate: [{ path: 'belongsto' }, {path: "following"} , {path: "followers"} ],
  
      });
    //We are passing deep populated data because

    //If logged user unfollows a user from his followings , we would also need to remove the logged user from the followers  list of the user being followed

 
    


    
    res.status(200).json({ user: extradata  , auth: true})

}

export const VerifyRegister = async (req, res) => {
    
    
    const { email } = req.body
    
    try {

        await ValidateRegister(req.body  , "verifyregister")

        const sendMailInstance = await new MailedData(otpModel, email, "otp", "Max otp sent!");
        sendMailInstance.mainFunc().then(() => {
            res.status(200).json({ msg: "Verification otp sent!" })

        }).catch((error) => {
            res.status(401).json({ error: error.message })

        });


    } catch (error) {

       

        res.status(401).json({ error: error.message })

    }
}

export const Register = async (req, res) => {


    const { username, name, email, password, value } = req.body
   

    try {

        await ValidateRegister(req.body, "register")
        await VerifyOtp(value, email)

        const hashed = await bcrypt.hash(password, 10)
        const user = await RegisterModel.create({ name: name, username: username.trim().toLowerCase(), email: email, password: hashed })
        await setCookie(res, user.id)
        await otpModel.deleteMany({ email })

        await UserExtrasModel.create({  belongsto: user._id , backgroundimage: process.env.DEFAULT_USER, dpimage: process.env.DEFAULT_USER, bio: "Add a bio" , posts: [] , followers: [] , interests: [] , following: [] , groups: []   })



        res.status(200).json({ register: true })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

export const Login = async (req, res) => {


    try {

        CheckFields(req.body, ["useremail", "password" , "hcaptchaToken"])

        const { useremail, password } = req.body


        const user = await RegisterModel.findOne({ $or: [{ username: useremail }, { email: useremail }] })


        if (!user) {

            throw new Error("Invalid credentials")

        }
        else {

            try {
                const pass = await bcrypt.compare(password, user.password)

                if (!pass) {

                    throw new Error("Invalid credentials!")

                }
                else {


                    await setCookie(res, user.id)
                
                    res.status(200).json({ auth: true })


                }

            } catch (error) {
          
                res.status(401).json({ error: error.message })

            }

        }

    } catch (error) {
  
        res.status(401).json({ error: error.message })

    }

}

export const ResetpassUrlGeneration = async (req, res) => {

    const { useremail } = req.body

    try {

        CheckFields(req.body , ["useremail" , "hcaptchaToken"])

        const user = await RegisterModel.findOne({ $or: [{ username: useremail }, { email: useremail }] })
        
        if (!user) {
            throw new Error("No user found!")
        }

        const resetpassuri = await new MailedData(ResetpassModel, user.email, "resetpassword", "Max password reset link sent. Try again later.", `${process.env.SITE_NAME}  Password recovery`, "Reset your password here ")

        resetpassuri.mainFunc().then(() => {

            res.status(200).json({ msg: "Password reset link sent!" , email: user.email })

        }).catch((error) => {

            res.status(400).json({ error: error.message })

        })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }


}

export const VerifyPassResetUrl = async (req, res) => {


    try {

        const { url } = req.body
      

        await verifyPassUri(`${process.env.ORIGIN}/resetpass/${url}` , req.body , ["url"])
        res.json({ verify: true })

    } catch (error) {

       
        res.status(400).json({ error: error.message  })

    }   



}

export const UpdatePassUrl = async (req, res) => {


    try {

        const { url  , pass, cpass} = req.body
        
        const user = await verifyPassUri(`${process.env.ORIGIN}/resetpass/${url}` , req.body , ["url" , "pass" , "cpass"])

        if (!pass || !cpass) {

            throw new Error('All fields are required!')

        }
        await ValidatePassword(pass, 5 , cpass)

        
        const hashpwd = await bcrypt.hash(pass, 10)
        await RegisterModel.updateOne({ email: user } , {password: hashpwd})
        await ResetpassModel.deleteMany({ email: user })
        res.json({ update: true })



    } catch (error) {
        
        res.status(400).json({ error: error.message })
    }
    


}

export const Logout = (req, res) => {

    res.cookie('validation_token', '', { expires: new Date(0) });
    res.json({ logout: true })
    
}

export const GoogleAuth = async (req, res) => {

    try {

        const {id} = req.user
        await setCookie(res , id)
        // await setCookie(res , _id)
        res.redirect('http://localhost:3000/')

    } catch (error) {
        
        res.redirect('http://localhost:3000/login')
    }
    
}