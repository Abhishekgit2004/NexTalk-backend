import express from "express"
import userRouter from "./routes/user.route.js"
import messagRouter from "./routes/Message.route.js"
import { middlewareError } from "./middleWare/error.middleware.js"
import cors from "cors"
// import { app } from "./socket/socket.js"

 export const app=express()


import cookieParser from "cookie-parser"
// import { authantication } from "./middleWare/auth.middelware.js"

app.use(express.json())
app.use(cookieParser())
app.use(cors({  
  origin: process.env.ORIGIN, // <-- frontend port
  credentials: true,               // <-- allows cookies to be sent
}));



app.use(express.urlencoded({extended:true,limit:"16kb"}))//use for url encoded like  sapce code is %20
app.use(express.static("public"))


app.use("/api/v1/users",userRouter)
app.use("/api/v1/message",messagRouter)
app.use(middlewareError)


