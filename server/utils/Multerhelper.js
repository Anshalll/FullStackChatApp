import path from 'path'
import multer from 'multer'

let uploadpath = path.join(path.resolve() + '/uploads')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadpath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
export const upload = multer({ storage: storage })