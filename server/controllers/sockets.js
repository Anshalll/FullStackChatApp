import { io } from "../index.js";


export const Clientsockets = () => {
    io.on("connection", (socket) => {
        console.log("Connected to socket id", socket.id);
    
        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });
        socket.emit("message" , 'Hello new user')
    });
}
