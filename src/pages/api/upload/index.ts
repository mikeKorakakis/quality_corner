import multer from "multer";
import path from "path";


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
const uploadFile = upload.single("filename");
export default async function handler(req: any, res: any) {
  if (req && req.method === "POST") {
   await uploadFile(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).send({filename: req.file.filename});
    });
//   } else {
    // Handle any other HTTP method
  }
}
