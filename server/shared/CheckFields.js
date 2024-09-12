import ValidationError from "../utils/ValidationError.js"

export const CheckFields = (data, arrdata) => {

        for (let a in data) {
        
            if (!arrdata.includes(a)) {
               console.log("NOt found " , a)
                throw new ValidationError("An error occured!")
            }
        }

}   