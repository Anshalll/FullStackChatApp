import { io } from "../index.js";
import {ChatRoomModel} from '../models/AppModel.js'
import {GetTime} from '../utils/getTime.js'


let users = {};

export const Clientsockets = () => {


  io.on("connection",  (socket) => {
    
    socket.on("online_users" , async (userid, callback) => {
      let findings = await ChatRoomModel.find()
      callback(findings)


    })


    socket.on("register", (userid, callback) => {
      if (userid) {
        users[userid] = socket.id;
        callback({ success: true, message: `Hello ${users[userid]}` });
      } else {
        callback({ success: false, message: `Socket connection failed!` });
      }
    });

    socket.on("unregister", (userid, callback) => {
      if (users[userid]) {
        delete users[userid];
        console.log("Unregistered user:", userid);
        callback({ success: true });
      } else {
        callback({ success: false, message: "User not found." });
      }
    });

    socket.on("sendmessage", async (data, callback) => {
      const { sender, reciever, message } = data;

      if (!users[sender]) {
        return callback({ success: false, message: `Sender ${sender} is not registered.` });
      }

      if (users[reciever]) {

        let timing = GetTime()

        let find_chat = await ChatRoomModel.findOne({ members: {$in : [sender, reciever]} })
        if (find_chat) {
          
          let messages = find_chat.messages
          messages.push({ sender , message ,  reciever , timing})

          await find_chat.save()

        }
        else{
          
           await ChatRoomModel.create({ members:  [sender, reciever] , messages: [{ sender , message , reciever , timing}] })

        }
        
        io.to(users[reciever]).emit("recieved_message", { message, sender , time: timing });
        callback({ success: true, message: `Message sent to ${reciever}.` });
      } else {
        callback({ success: false, message: `User ${reciever} is offline.` });
      }
    });

    socket.on("check_user", (user, callback) => {
      if (users[user]) {
        callback({ success: true });
      } else {
        callback({ success: false });
      }
    });

  

    socket.on("disconnect", () => {
      const user = Object.keys(users).find((key) => users[key] === socket.id);
      if (user) {
        delete users[user];
        console.log("User disconnected and removed:", user);
      }
    });
  });
};
