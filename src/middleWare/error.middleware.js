

const middlewareError=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message|| "Enternal server error"

    res.status(err.statusCode).json({
        success:false,
        errmessage:err.message
    })
    next()
}

export {middlewareError}