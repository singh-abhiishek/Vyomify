import multer from "multer";

// disk storage (we can also do:- memory storage)

// File destination: Files ko ./public/temp folder mein store kiya jayega.
// File name: File ka naam original name ke saath save hoga (file.originalname).
// Storage Configuration: multer.diskStorage() se storage ka configuration banaya gaya hai.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")  //null ko as 1st argument pass karna, means "no error"
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname)
    }
})
  
export const upload = multer({ 
    // storage: storage 
            // OR
    storage,
})