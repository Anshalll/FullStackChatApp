import jwt from 'jsonwebtoken'
import { ResetpassModel } from '../models/ResetpassModel.js'

export const GenerateOtp = (length) => {

    let code = ""
    const vals = '1234567890'
    
    for (let a = 0; a < length; a++) {
  
        const RandValue  = Math.floor(Math.random() * vals.length)
        code  = vals[RandValue] + code
        
    }

    return code
}


export const GenerateResetPassUrl =  async ( uid) => {

    let randtext = ""
    let stringVal = "abcdefghiklmnopqrstuvwxyz"

    for(let i = 0; i < 10 ; i++){
        const randVal = Math.floor(Math.random() * stringVal.length)


        randtext = stringVal[randVal] + randtext

    
    }

    const uri = await jwt.sign({ url : uid + randtext } , process.env.JWT)

    return `${process.env.ORIGIN}/resetpass/${uri}`

}



export const GenerateUsername =  async (givenName) => {

    let randtext = ""
    let stringVal = "abcdefghiklmnopqrstuvwxyz1234567890_"

    for(let i = 0; i < 4 ; i++){
        const randVal = Math.floor(Math.random() * stringVal.length)


        randtext =  stringVal[randVal] + randtext

    
    }

    return givenName+randtext


}
