import { Router, Request, Response } from "express"
import { SetPage } from "../../lib/Page";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-Video${path.extname(file.originalname)}`);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create the express router
const router = Router();

router.get('/form', (req: Request, res: Response) => {
    return SetPage(req, res, {
        title: "Convertor",
        description: "",
        view: "form",
        data: {

        }
    })
});

router.post('/convert', upload.single('video'), async (req: Request, res: Response) => {
    if (req.file) {
      let file = req?.file;
      console.log(file);
      res.send({ message: 'Video uploaded successfully.' });
    } else {
      res.status(400).send({ error: 'No video file uploaded.' });
    }
  });

export default router;