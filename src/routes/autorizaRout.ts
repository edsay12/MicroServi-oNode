import { NextFunction, Request, Response, Router } from "express";
import { buffer } from "stream/consumers";
import ForbittenErrorRout from "../models/errors/ForbittenErrorRout";
const autoriza = Router();
autoriza.post('/token',(req:Request,res:Response,next:NextFunction)=>{
    const autorizaHeader = req.headers['authorization'];
    console.log(autorizaHeader)
    try{
        if(!autorizaHeader){
            console.log('deu erro')   
            throw new ForbittenErrorRout('Cledenciais nao informadas')
        }else{
            const [type,token] = autorizaHeader.split(' ')
            if(type !== 'Basic' || !token){
                throw new ForbittenErrorRout('tipo de authenticação invalida');
            }
            const tokencontent =  Buffer.from(token,'base64').toString('utf-8')
            const [username,password] =  tokencontent.split(':');
            if(!username || !password){
                throw new ForbittenErrorRout("Cledenciais nao preenchidas");
                
            }
    
            
            console.log(tokencontent)
            
        }
        
    }catch(error){
        next(error)

    }
    
})
export default autoriza