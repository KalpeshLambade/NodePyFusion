import {Router,Request,Response} from "express"
import { SetPage } from "../../lib/Page";


const router = Router();

router.get('/form', (req:Request, res:Response)=>{
    return SetPage(req,res,{
        title : "Convertor",
        description : "",
        view : "form",
        data:{
            
        }
    })
})

export default router;