import jwt from 'jsonwebtoken'


export const setCookie = async (res , id) => {
  
    const cookie = await jwt.sign({ uid: id  }, process.env.JWT)

    const date = new Date()
    date.setTime(date.getTime() + (720 * 60 * 60 * 1000))
    
    res.cookie('validation_token', cookie, {
        sameSite: "strict",
        secure: true,
        expires: date,
        httpOnly: true,
        priority: 'high',
    
    
    })

}

