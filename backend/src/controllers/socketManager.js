import { Server } from "socket.io"

export const socketManager=(server)=>{
    const io=new Server(server)
    return io;
}

