import ValidateRegister from '../utils/Validators.js'
import { RegisterModel } from '../models/Models.js'
import bcrypt from 'bcrypt'
import { otpModel } from '../models/otp.js'
import MailedData from '../utils/RegisterMailData.js'
import { VerifyOtp } from '../utils/Verifyemails.js'
import { setCookie } from '../shared/setCookie.js'
import { CheckFields } from '../shared/CheckFields.js'
import { ResetpassModel } from '../models/ResetpassModel.js'
import { verifyPassUri } from '../utils/VerifyresetPassuri.js'
import { ValidatePassword } from '../utils/Passwordvalidator.js'
import { UserExtraModel } from '../models/Models.js'
import fs from 'fs'
import { Fileupload } from '../utils/FIleuploads.js'
import path from 'path'

export const Index = async (req, res) => {



    res.status(200).json({ auth: true })

}

export const VerifyRegister = async (req, res) => {


    const { email } = req.body

    try {

        await ValidateRegister(req.body, "verifyregister")

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
        await UserExtraModel.create({ belongsto: user._id , dpimage: `${process.env.SERVER_URI}/defaults/default_user.jpg` , interests: [] , backgroundimage: `${process.env.SERVER_URI}/defaults/default_user.jpg`  , bio: "Add a bio"   })

        await setCookie(res, user.id)
        await otpModel.deleteMany({ email })
        res.status(200).json({ register: true })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

export const Login = async (req, res) => {


    try {

        CheckFields(req.body, ["useremail", "password", "hcaptchaToken"])

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

        CheckFields(req.body, ["useremail", "hcaptchaToken"])

        const user = await RegisterModel.findOne({ $or: [{ username: useremail }, { email: useremail }] })

        if (!user) {
            throw new Error("No user found!")
        }

        const resetpassuri = await new MailedData(ResetpassModel, user.email, "resetpassword", "Max password reset link sent. Try again later.", `${process.env.SITE_NAME}  Password recovery`, "Reset your password here ")

        resetpassuri.mainFunc().then(() => {

            res.status(200).json({ msg: "Password reset link sent!", email: user.email })

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


        await verifyPassUri(`${process.env.ORIGIN}/resetpass/${url}`, req.body, ["url"])
        res.json({ verify: true })

    } catch (error) {


        res.status(400).json({ error: error.message })

    }



}

export const UpdatePassUrl = async (req, res) => {


    try {

        const { url, pass, cpass } = req.body

        const user = await verifyPassUri(`${process.env.ORIGIN}/resetpass/${url}`, req.body, ["url", "pass", "cpass"])

        if (!pass || !cpass) {

            throw new Error('All fields are required!')

        }
        await ValidatePassword(pass, 5, cpass)


        const hashpwd = await bcrypt.hash(pass, 10)
        await RegisterModel.updateOne({ email: user }, { password: hashpwd })
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

        const { id } = req.user
        await setCookie(res, id)
        // await setCookie(res , _id)
        res.redirect('http://localhost:3000/')

    } catch (error) {

        res.redirect('http://localhost:3000/login')
    }

}

export const Getuserdata = async (req, res) => {

    try {
        const { id } = req


        const user = await RegisterModel.findById(id).select('-password')

        const userextras = await UserExtraModel.findOne({ belongsto: user._id })
        const data = [user, userextras]
        res.json({ data })

    } catch (error) {

        res.clearCookie('validation_token', {
            httpOnly: true,
            secure: process.env.SITE_MODE === "production",
        })
        res.redirect("http://localhost:3000/login")
    }




}


export const UpdateExtras = async (req, res) => {

    
    try {
        const { username, name, bio, interests, uid } = req.body


    let user_interests = interests.split(",")


    await RegisterModel.findByIdAndUpdate(uid, { username: username, name: name }, { new: true })

    await UserExtraModel.findOneAndUpdate({ belongsto: uid }, { bio: bio, interests: user_interests }, { new: true, upsert: true })



        return res.status(200).json({ message: "Profileupdated"  })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "An error occured!" })
    }
    
}


export const Upload_dp =  (req, res) => {

    try {
        const { dp } = req.files;
        let size  = 5 * 1024 * 1024
        Fileupload(size, dp , res, req ,  UserExtraModel , "dpimage")
  

    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(400).json({ error: error.message || 'An error occurred. Please try again.' });
    }


};


export const Upload_bg = (req, res) => {
    
    try {
        const { bg } = req.files;
        let size  = 10 * 1024 * 1024
        Fileupload(size, bg , res, req ,  UserExtraModel , "backgroundimage")
  

    } catch (error) {
     
        res.status(400).json({ error: error.message || 'An error occurred. Please try again.' });
    }
}

export const Delete_bg = async (req, res) => {
    const {id} = req
 
    
    try {

        const Find_user = await UserExtraModel.findOne({ belongsto: id })

        if (Find_user.backgroundimage !== `${process.env.SERVER_URI}/defaults/default_user.jpg`) {
            const filepath = Find_user.backgroundimage.split('/')
            const file_rm = path.join(path.resolve() , `/public/uploads/${filepath[filepath.length - 1]}`)
            await new Promise((resolve, reject) => {
                fs.unlink(file_rm, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
            Find_user.backgroundimage = `${process.env.SERVER_URI}/defaults/default_user.jpg`
            await Find_user.save()
            return res.status(200).json({ message: "Background image updated!"})

        }
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "An error occured!" })
        
    }

}


export const Delete_dp = async (req, res) => {
    const {id} = req
 
    
    try {

        const Find_user = await UserExtraModel.findOne({ belongsto: id })

        if (Find_user.dpimage !== `${process.env.SERVER_URI}/defaults/default_user.jpg`) {
            const filepath = Find_user.dpimage.split('/')
            const file_rm = path.join(path.resolve() , `/public/uploads/${filepath[filepath.length - 1]}`)
            await new Promise((resolve, reject) => {
                fs.unlink(file_rm, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
            Find_user.dpimage = `${process.env.SERVER_URI}/defaults/default_user.jpg`
            await Find_user.save()
            return res.status(200).json({ message: "Dp updated!"})

        }
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "An error occured!" })
        
    }
}


export const Searchprofile = async (req, res) => {

    const {data} = req.body
    const users = await RegisterModel.find({ username: { $regex: data, $options: 'i' } }).select('-password')

    const userids = users.map(user => user._id)
    
    const userextras = await UserExtraModel.find({ belongsto: {$in : userids }}).populate('belongsto')
    
    console.log(userextras);
    
    
    res.status(200).json({ results: userextras })

 
    

}

export const Getauser = async (req, res) => {
    const {user} = req.body
   
    const user_data = await RegisterModel.findOne({ username: user}).select('-password')
    const extra_data = await UserExtraModel.findOne({ belongsto : user_data._id }).populate('belongsto')
   
    
    res.json({ data: extra_data })
}