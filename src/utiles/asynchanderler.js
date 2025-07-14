const asynchandler=(fun)=>(req,res,next)=>{
Promise.resolve(fun(req,res,next)).catch((err)=>next(err));
}

export {asynchandler}