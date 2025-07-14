import { asynchandler } from "../utiles/asynchanderler.js";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js"; // ✅ Fixed spelling
import { ApiError } from "../utiles/ApiError.js";
import { Apiresponse } from "../utiles/Apiresponse.js";
import { getscoketid, io } from "../socket/socket.js";


const messageContainer = asynchandler(async (req, res) => {
   
   const receiverId = req.params.receiverId;
    const senderId = req.user._id;
    const messageText = req.body.message;

   

    if (!receiverId || !senderId || !messageText) {
        throw new ApiError(400, "All fields are required");
    }

    let conversation = await Conversation.findOne({
        participant: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participant: [senderId, receiverId],
            messages: []
        });
    }

    const newMessage = await Message.create({
        senderId,
        reciverId: receiverId,  
        messages: messageText
    });
    // console.log(receiverId)

    if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }
// console.log(newMessage)

const scoketid=getscoketid(receiverId)
io.to(scoketid).emit("newMessage",newMessage) 


    res.status(200).json(
        new Apiresponse(200, newMessage, "Message sent and conversation updated successfully")
    );
});
const getMassage=asynchandler(async(req,res)=>{
    const otherUserId= req.params.otherUserId;
    const myid = req.user._id;
    // console.log(otherUserId,myid)
   if (!otherUserId|| !myid ) {
        throw new ApiError(400, "All fields are required");
    }
    let conversation=await Conversation.findOne({
        participant:{ $all :[myid,otherUserId]}
    }).populate( "messages");

    res.status(200).json(new Apiresponse(200,conversation,"done"))
})

export { messageContainer,
    getMassage

 };
