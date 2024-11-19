import { Response,Request, Router } from "express";
import formRouter from "../routes/convertor/_router"

const router = Router();

router.get('/dummy', (req:Request, res:Response):void=>{
    res.send({"status" : "sucess"})
})

router.use('/convertor', formRouter)

export default router;