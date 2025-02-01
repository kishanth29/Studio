

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV == 'devolopment'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error',
            stack:err.stack,
            error: err
        });

    }else if 
        (process.env.NODE_ENV == 'production'){
            // how to get an error message from server
            let message = err.message;
            let error = new Error(message)

            if(err.name == "ValidationError") {
                message = Object.values(err.errors).map(value =>value.message)
                error = new Error(message)
                err.statusCode = 400
            }
            if(err.name == "CastError"){
                message = `Resource not found ${err.path}`
                err.statusCode = 400
            } 
            if(err.code == 11000){
                let message =`Duplicate ${Object.keys(err.keyValue)} error`;
                error = new Error(message)
                err.statusCode = 400
            }
            if(err.name == 'JSONWebtokenError'){
                let message = `JSON Web Token invalid. Try again`;
                error = new Error(message)
                err.statusCode = 400
            }
            if(err.name == 'TokenExpiredError'){
                let message = `JSON Web Token is expired. Try again`;
                error = new Error(message)
                err.statusCode = 400
            }
            res.status(err.statusCode).json({
                success: false,
                message: error.message || 'Internal Server Error'
                
                
            });

        }else {
            // Default to production if NODE_ENV is not set
            res.status(err.statusCode).json({
                success: false,
                message: err.message || 'Internal Server Error'
                // message wee see errors
            });
        }   

   
}

