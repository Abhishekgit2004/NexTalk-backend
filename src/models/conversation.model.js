import mongoose from "mongoose";


const conversationschema=new mongoose.Schema({

    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    messages:[
        {
  type:mongoose.Schema.Types.ObjectId,
            ref:"message"
        }
    ]
})


export const Conversation=mongoose.model("Conversation",conversationschema)