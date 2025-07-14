import multer from "multer"

const storage = multer.diskStorage({
   
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    
    }
  })
  console.log("mmm")
  
export const upload = multer({ 
    storage, 
})
