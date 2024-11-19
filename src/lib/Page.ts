import { Request,Response } from "express"

export const SetPage = (req:Request,res:Response,pageOptions:{
    title:string,
    description:string,
    view:string,
    data?:any
})=>{
    res.render(pageOptions?.view,{
        HOST :process.env.DOMAIN ?? "default.domain.com",
        title : pageOptions?.title,
        description : pageOptions?.description,
        data : pageOptions?.data
    })
}

export const StatusSucess = {
    status : "sucess"
}

export const StatusFailed = {
    status : "failed"
}