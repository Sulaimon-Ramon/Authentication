import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req: any, file : any, cb : any) {
      cb(null, '/uploads')
    },
    filename: function (req : any, file : any, cb : any) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
export const upload = multer({ storage: storage })

// export default upload;