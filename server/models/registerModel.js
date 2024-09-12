import mongoose from 'mongoose'


const Model = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        
    }

})


export const RegisterModel = mongoose.model('register' , Model)


