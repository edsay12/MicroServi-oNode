import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepositori from '../repositories/UserRepositori'
const userRoute = Router();



userRoute.get('/users',async (req:Request,res:Response,next:NextFunction)=>{
    const users = await UserRepositori.findusers()
    res.status(StatusCodes.OK).send(users)
    
});

userRoute.get('/users/:uuid', async (req:Request<{uuid:String}>,res:Response,next:NextFunction)=>{
    try{
        const user = await UserRepositori.finduserbyid(req.params.uuid);
        res.status(StatusCodes.OK).send(user)
    }catch(error){
        next(error)
        

    }
    
});

userRoute.post('/users',async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    const uuid = await UserRepositori.insernewuser(req.body);
    res.status(StatusCodes.CREATED).send(uuid)
});

userRoute.put('/users/:uuid',async (req:Request<{uuid:String}>,res:Response,next:NextFunction)=>{
    const uuid = req.params.uuid
    const modifyuser = req.body
    modifyuser.uuid = uuid
    await UserRepositori.updateuser(modifyuser);
    res.status(StatusCodes.OK).send('sucess')

});

userRoute.delete('/users/:uuid',async (req:Request<{uuid:String}>,res:Response,next:NextFunction)=>{
    const uuid = req.params.uuid
   await UserRepositori.deleteuser(uuid)
   res.status(200).send("sucess")
    

});

export = userRoute