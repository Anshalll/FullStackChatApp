import mongoose from 'mongoose'



const UserExtras = new mongoose.Schema({
    belongsto : { type: mongoose.Schema.Types.ObjectId, ref: 'register' },
    backgroundimage: String,
    dpimage: String,
    bio: String,
    interests: Array,
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
    posts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userextra' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userextra' }]
})


export const UserExtrasModel =  mongoose.model('userextra' , UserExtras)


