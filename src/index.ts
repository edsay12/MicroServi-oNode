import express ,{Request,Response,NextFunction} from 'express'
const app = express();
const port = 8081




app.get('/status',(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).send("ola mundo")
})

app.listen(port,()=>{
    console.log(`server iniciado na porta:${port}`);
});
