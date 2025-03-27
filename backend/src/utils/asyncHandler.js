//******************** Promise ************************//

// NOTE: asyncHandler error ko catch karke next(err) ke through pass karta hai.
// Express error middleware automatically trigger hota hai jab next(err) call hota hai.
// Aap server-side logs ya API response ke zariye error ko easily access kar sakte ho.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}


//******************* try catch ***************************//

/*
const asyncHandler = (fn) => {}
const asyncHandler = (fn) => {() => {}}
const asyncHandler = (fn) => {async () => {}}
const asyncHandler = (fn) => async () => {}
*/

/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
*/