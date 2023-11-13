export function notFoundError(res,req,next){
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
}


export function errorHandler (err,req,res,next){
    res.status(err.status || 500).json({
        message:err.message,
    })
}