import express from "express"
import {createServer} from "node:http"


import { Server } from "socket.io"
import mongoose, { mongo } from "mongoose"

import cors from "cors"

//this is causing error
import userRoutes from "./routes/usersRoute.js"
import {socketManager} from "./controllers/socketManager.js"

const app=express()

const server=createServer(app)
const io=socketManager(server)



//to toake port form the applicaiton 
app.set("port",(process.env.PORT || 8000))

app.use(cors())//cross origin resource share

//handle max request allowed 
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}))


app.use("/api/v1/users",userRoutes)


const start=async()=>{

    //connecting the mongoose server
    const connectDB=await mongoose.connect("mongodb+srv://prakashaaditya68:brucewayne@cluster0.xncpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`connected DB ${connectDB.connection.host}`);
    

    //starting the server
    server.listen(app.get("port"),()=>{
        console.log(`listening to PORT `);
        
    })


}


start()