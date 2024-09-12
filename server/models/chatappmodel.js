import mongoose from "mongoose";



const UserExtra = new mongoose.Schema({
    belongsto : { type: mongoose.Schema.Types.ObjectId, ref: 'register' },
    backgroundimage: String,
    dpimage: String,
    bio: String,
    followers : String,
    following: String,
    interset: Array,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'register' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'register' }]

})




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
