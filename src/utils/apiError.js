class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export {ApiError}

// NOTE: asyncHandler: Async functions ka error catch karke middleware(next) tak pahuchata hai.
// ApiError: Ek custom error object banata hai, taaki middleware structured aur complete response bhej sake.
// Middleware: Error ko check karta hai aur API ko proper status code + message ke saath reply bhejta hai.


//NOTE:
// Async handler se wrap karne ke baad mujhe baar-baar try-catch likhne ki zaroorat nahi hoti."
// ✅ "Error aane pe throw new ApiError catch block me chali jaati hai jo asyncHandler me likha hota hai."
// ✅ "Waha se wo next() ke through error middleware tak chali jaati hai, jo ki JSON response de deta hai." agr hmne wo middleware nhi likha hai to error html format m milegi

// MIDDLEWARE:-
// app.use((err, req, res, next) => {
//     res.status(err.statusCode || 500).json({
//         success: false,
//         message: err.message || "Internal Server Error",
//         errors: err.errors || [],
//         data: null,
//     });
// });
