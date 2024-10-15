import { otpModel } from "../models/otp.js"
import { ResetpassModel } from "../models/ResetpassModel.js"
export const Deleteotps = async () => {
    const timeNow  = new Date()
    const timeMill = timeNow.getTime()
    const data = await otpModel.find({})
    const data1 = await ResetpassModel.find({ })

    for(let a of data){
       const timeOfOtp = a.time
       const timegap = timeMill - timeOfOtp
      
       if (timegap > 900000) {
         
            await otpModel.deleteMany({ time: timeOfOtp})
       }
    }

    for(let a of data1){
        const timeOfOtp = a.time
        const timegap = timeMill - timeOfOtp
      
       
        if (timegap > 900000) {
            
             await ResetpassModel.deleteMany({ time: timeOfOtp})
        }
     }
 



}