import { otpModel } from '../models/otp.js'

export const VerifyOtp = async (value , email) => {


    const checkotp = await otpModel.findOne({ email : email })
    if (!checkotp) {
       throw new Error("An error occured") 
    }
    const MainVal = checkotp.value
    if (MainVal !== value) {
        throw new Error("Invalid otp") 

    }


}