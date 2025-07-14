import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { app } from "../app.js";
// const app=express()

// HTTP server
const server = http.createServer(app);

// Socket.IO instance

const userScoketMap = {};
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});
io.on("connection", (socket) => {
  const userids = socket.handshake.query.userid;
  if (!userids) return;
  userScoketMap[userids] = socket.id;


  io.emit("userOnline", Object.keys(userScoketMap));
 

  socket.on("disconnect",()=>{
    delete userScoketMap[userids];

  io.emit("userOnline", Object.keys(userScoketMap));

  })


});
  const getscoketid=(userId)=>{
    return userScoketMap[userId]
  }

export {  io, server ,getscoketid};
