class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.data = null;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }else{
            throw Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}