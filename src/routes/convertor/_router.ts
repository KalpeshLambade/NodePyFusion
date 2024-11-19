import { Router, Request, Response } from "express"
import { SetPage } from "../../lib/Page";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

const uploadsDir = path.join(__dirname, '../../../uploads');
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


const handelConverScripts = (script_name: string, video_path: string, output_folder: string, target_fps: string) => {
    return new Promise<number | null>((resolve, reject) => {
        const pythonProcess = spawn('py', [script_name, video_path, output_folder, target_fps]);
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python Output: ${data.toString()}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python Error: ${data.toString()}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Python script executed successfully!');
                resolve(code);
            } else {
                console.log(`Python script exited with code ${code}`)
                resolve(null)
            }
        });
    })

}

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

router.post('/convert', upload.single('video'), async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.file) {
            let fps = req?.body?.fps
            let file = req?.file;

            if (fps && file) {
                let imgscriptRes = await handelConverScripts('scripts/vidToImg.py', file?.path, 'out_imgs', fps,);

                if (imgscriptRes === 0) {
                    let pdfscriptRes = await handelConverScripts('scripts/imgToPdf.py', 'out_imgs', 'out_pdf', 'output.pdf',);

                    if (pdfscriptRes === 0) {
                        const filePath = path.resolve('out_pdf', 'output.pdf');
                        setTimeout(()=>{
                            
                        },500)
                        return res.download(filePath, 'output.pdf');
                    }
                }

            }
            return res.status(500).send({ error: 'Something Went Wrong.' });
        } else {
            return res.status(400).send({ error: 'No video file uploaded.' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Something Went Wrong.' });
    }

});

export default router;