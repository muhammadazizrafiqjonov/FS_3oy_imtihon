import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import {join} from "path";
import { AdminRouter, BranchRouter, StaffRouter, TransportRouter } from "./routers/index.js";
config();

const app = express();

app.use(express.json());
app.use(fileUpload())
app.use(StaffRouter)
app.use(BranchRouter)
app.use(TransportRouter)
app.use(AdminRouter)


app.use((error, req, res, next) => {
    
    if(error.status && error.status < 500){
        return res.status(error.status).json({
            status:error.status,
            message:error.message,
            name:error.name
        })
    }
    else {
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${error}`
        fs.appendFileSync(join(process.cwd(), 'src', 'logs','logger.txt'), errorText)

        res.status(500).json({
            status:500,
            message:"InertanServerError"
        })
    }
    
})

app.listen(process.env.PORT, () => console.log("Server is running"));




