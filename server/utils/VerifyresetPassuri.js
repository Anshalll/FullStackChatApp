import jwt from 'jsonwebtoken'
import { ResetpassModel } from '../models/ResetpassModel.js'
import { CheckFields } from '../shared/CheckFields.js'

export const verifyPassUri = async (url , body , arrData) => {
 
    CheckFields(body ,  arrData)
        
    const checkData = await ResetpassModel.findOne({ value: url })
    


    if (!url || !checkData) {
        throw new Error("An error occured!")
    }

    const maintoken = url.split("/")[4]


    const token = await jwt.verify(maintoken , process.env.JWT)

    if(!token){
        throw new Error("An error occured!")
    }

    return token.url.slice(0 , -10)
}