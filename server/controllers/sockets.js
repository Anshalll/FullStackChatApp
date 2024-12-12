import { io } from "../index.js";

let users = {};

export const Clientsockets = () => {
  io.on("connection", (socket) => {
    console.log("New connection established:", socket.id);

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

    socket.on("sendmessage", (data, callback) => {
      const { sender, reciever, message } = data;

      if (!users[sender]) {
        return callback({ success: false, message: `Sender ${sender} is not registered.` });
      }

      if (users[reciever]) {
        io.to(users[reciever]).emit("recieved_message", { message, sender });
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
