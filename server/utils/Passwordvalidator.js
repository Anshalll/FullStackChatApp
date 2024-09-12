import ValidationError from "./ValidationError.js"

export const ValidatePassword = (password , length , cpass) => {

    if (password.length < length) {

        throw new ValidationError("Password too short")

    }
    else if(!/[a-z]/.test(password)){

        throw new ValidationError("Password must contain lowercase characters")

    }
    else if(!/[A-Z]/.test(password)){

        throw new ValidationError("Password must contain uppercase characters")

    }
    else if(!/[0-9]/.test(password)){

        throw new ValidationError("Password must contain numbers")

    }
    else if(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(password)){

        throw new ValidationError("Password can not include an emoji")

    }
    else if(password != cpass){

        throw new ValidationError("Confirmed password should match!")

    }
    
}