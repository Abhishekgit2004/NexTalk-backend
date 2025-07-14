import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    reciverId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    messages:{
        type:String,
            require:true
    }
},{
    timestamps: true
})

export const  Message=mongoose.model("message",messageSchema)