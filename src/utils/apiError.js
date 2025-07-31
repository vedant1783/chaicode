class ApiError extends Error {
    constructor(message = "Something Went Wrong", statusCode, errors = [], stack = "") {
        SourceBuffer(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.sucess = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export { ApiError };
