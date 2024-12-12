import jwt from 'jsonwebtoken'


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


export const GenerateChatroomId = async () => {

    let chatroomid = ""
    let characters = "abcdefghijklmnopqrstuvwxyz1234567890-$#*"

    for (let i = 0; i < 20; i++) {
        const randVal = Math.floor(Math.random() * characters.length)
        chatroomid = characters[randVal] + chatroomid
    }

    return chatroomid
}

