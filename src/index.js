import express from "express";

// import { app } from "./socket/socket.js";
// import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv"
import { server } from "./socket/socket.js";
dotenv.config()
connectDB()
.then(()=>{
        server.listen(process.env.PORT || 8000,()=>{
            console.log(`server runing on ${process.env.PORT }`)
        })
})
.catch((error)=>{
    console.log(`mongodb connection failed ${error}`)
        server.on((err)=>{
            console.log(err)
            throw err
        })
})


