import mongoose from 'mongoose'



const UserExtras = new mongoose.Schema({
    belongsto : { type: mongoose.Schema.Types.ObjectId, ref: 'register' },
    backgroundimage: String,
    dpimage: String,
    bio: String,
    interests: Array,
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
    posts:  Array,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userextra' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userextra' }]
})

const Chatroom = new mongoose.Schema({

    members:  [{ type: mongoose.Schema.Types.ObjectId , ref: 'userextra' }],
    
    messages: Array,


})


export const UserExtrasModel =  mongoose.model('userextra' , UserExtras)
export const ChatRoomModel = mongoose.model('chatroom' , Chatroom)



