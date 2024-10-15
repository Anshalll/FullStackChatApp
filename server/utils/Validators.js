import EmailValidator from 'email-validator'
import ValidationError from './ValidationError.js'
import { ValidatePassword } from './Passwordvalidator.js'
import { RegisterModel } from '../models/registerModel.js'
import { CheckFields } from '../shared/CheckFields.js'


const ValidateRegister = async (data , type) => {
   
    CheckFields(data , ["username" , "password" , "email" , "cpass" , "name" , type === "register" ?  "value" : null , "hcaptchaToken"])

    for (let a in data) {
        
        if (data[a].trim().length === 0) {

            throw new ValidationError(`${a} is required`)

        }
    }

    if (await RegisterModel.findOne({ username: data.username })) {
        throw new ValidationError("This username is taken.")
        
    }

    else if (!/^[a-z0-9_.]+$/.test(data.username)) {

        throw new ValidationError("Username can only contain Alphabets, numbers, periods and _")
    }



    else if (/^[.]/.test(data.username)) {

        throw new ValidationError("Username can not begin with period")

    }
    else if (/[.]$/.test(data.username)) {

        throw new ValidationError("Username can not end with period")

    }
    else if (/[A-Z]/.test(data.username)) {

        throw new ValidationError("Username cannot contain upppercase characters.")

    }

    else if (/\.\./.test(data.username)) {
        throw new ValidationError("username can not include two periods in a row")
    }

    else if (/^[_]+$/.test(data.username)) {

        throw new ValidationError("Invalid username")

    }
    else if ((/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(data.username))) {
        throw new ValidationError("Username can not include emoji")

    }
    else if(await RegisterModel.findOne({ email: data.email })){
        throw new ValidationError("This email is taken.")

    }
    else if (!EmailValidator.validate(data.email)) {

        throw new ValidationError("Invalid email")

    }

    ValidatePassword(data.password, 5 , data.cpass)

}

export default ValidateRegister