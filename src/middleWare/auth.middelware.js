import jwt from "jsonwebtoken";
import { ApiError } from "../utiles/ApiError.js";
import { asynchandler } from "../utiles/asynchanderler.js";

 const authantication=asynchandler(async(req,res,next)=>{

  const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"not found")
    }

    const tokendata= await jwt.verify(token,process.env.JWT_SECRATE)
    
   
     req.user=tokendata
    
next()
})
export{authantication}