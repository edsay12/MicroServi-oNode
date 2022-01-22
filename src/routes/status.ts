import { Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
const statusRout = Router();

statusRout.get("/status",(req:Request,res:Response)=>{
    res.status(StatusCodes.OK).send("tudo OK ")

})

export = statusRout