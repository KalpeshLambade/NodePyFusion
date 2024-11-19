import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import router from "./routes/_router";
import { engine } from "express-handlebars";
import path from "path";

dotenv.config();
const expressApp = express();

// expressApp.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend's origin
// }))

//View Engine 
expressApp.engine('hbs',engine({
    extname :".hbs",
    defaultLayout : "layout"
}));
expressApp.set("view engine","hbs");
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.use('/api', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

//Router
expressApp.use('/api',router)

expressApp.listen(process.env.PORT, ()=>{
    console.info(`-------------------------------`);
    console.log(`🚀 Aloha! Your app is now live. Get ready to make something amazing happen!`);
    console.info(`Environment : ${process.env.ENV}`);
    console.info(`Port : ${process.env.PORT}`);
    console.info(`API : ${process.env.DOMAIN}/api`);
    console.info(`-------------------------------`);
})