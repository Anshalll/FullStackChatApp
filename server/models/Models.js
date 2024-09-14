import mongoose from "mongoose";



const UserExtra = new mongoose.Schema({
    belongsto : { type: mongoose.Schema.Types.ObjectId, ref: 'register' },
    backgroundimage: String,
    dpimage: String,
    bio: String,
    followers : String,
    following: String,
    interests: Array,
    Groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
    posts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'register' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'register' }]

})

const register_Model = new mongoose.Schema({

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


export const RegisterModel = mongoose.model('register' , register_Model)



const ChatRoomSchema = new mongoose.Schema({
    chatid: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chatmessage' }]  
});


const ChatMessageSchema = new mongoose.Schema({
    msg: { type: String, required: true },  
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'register' }, 
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'register' },  
    belongsto: { type: mongoose.Schema.Types.ObjectId, ref: 'chatroom' },  
    timestamp: { type: Date, default: Date.now } 
});




export const ChatMessageModel = mongoose.model("chatmessage", ChatMessageSchema); 
export const ChatRoomModel = mongoose.model("chatroom", ChatRoomSchema); 
export const UserExtraModel = mongoose.model('userextra' , UserExtra)
