import mongoose from "mongoose"
import bcrypt from "bcryptjs";
const userschema=new mongoose.Schema({
fullName:{
    required:true,
    type:String,

},
username:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
gender:{
    type:String,
    required:true
}
,

avatar:{
    type:String,
}

},{
    timestamps:true
})

userschema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next();
})
userschema .methods.ispasswordcorrect= async function(password){
 return await bcrypt.compare(password,this.password)
}


export const user=mongoose.model("user",userschema)