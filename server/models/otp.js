import mongoose from 'mongoose'


const Model = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    
    value: {
        type: String,
        required: true

    },
    time: {
        type: String,
        required: true
    }

})


export const otpModel = mongoose.model('otp', Model)


