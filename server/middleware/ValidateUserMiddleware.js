import jwt from 'jsonwebtoken'

export const ValidateUser = async (req, res , next) => {


    const {validation_token} = req.cookies
    

    if (!validation_token) {

        return res.status(401).json({ auth: false }); 

    } else {

     const {uid} = await jwt.verify(validation_token , process.env.JWT)

      if (!uid) {
        return res.status(401).json({ auth: false }); 
      }
      else{
        req.id = uid
        next()  
      }

    }

 
};
