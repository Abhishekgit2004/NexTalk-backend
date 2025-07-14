import mongoose from "mongoose";
import { db_name } from "../constrain.js";

const connectDB=async()=>{
        try {
         const instance= await mongoose.connect(`${process.env.MONGODBURI}/${db_name}`)
         console.log(`mongodbconnect successfully ${instance.connection.host}`)
        } catch (error) {
            console.log(`mongodb connection failed ${error}`)
        }
}

export default connectDB