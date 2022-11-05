import multer from "multer";
import path from "path";
// import { NextApiRequest } from "next";
// import { NextApiResponse } from "next";

// const saveFile = async (file) => {
//     const data = fs.readFileSync(file.path);
//     fs.writeFileSync(`./public/${file.name}`, data);
//     await fs.unlinkSync(file.path);
//     return;
//   };

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
const uploadFile = upload.single("file");
export default async function handler(req: any, res: any) {
  if (req && req.method === "POST") {
   await uploadFile(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).send({filename:req.file.filename});
    });
//   } else {
    // Handle any other HTTP method
  }
}
