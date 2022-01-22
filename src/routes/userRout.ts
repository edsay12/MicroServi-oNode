import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
const userRoute = Router();



userRoute.get('/users',(req:Request,res:Response,next:NextFunction)=>{
    res.status(StatusCodes.OK).send("usuarios")
    
});

userRoute.get('/users/:uuid',(req:Request<{uuid:String}>,res:Response,next:NextFunction)=>{
    res.status(StatusCodes.OK).send(`usuario ${req.params.uuid}`)
    
});

userRoute.post('/users',(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    res.status(StatusCodes.CREATED).send(req.body)
});

userRoute.put('/users/:uuid',(req:Request<{uuid:String}>,res:Response,next:NextFunction)=>{

});

userRoute.delete('/users//:uuid',(req:Request,res:Response,next:NextFunction)=>{

});

export = userRoute