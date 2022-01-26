import { NextFunction,Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/DataBaseErrorModule";
import ForbittenErrorRout from "../models/errors/ForbittenErrorRout";


function errorhandle(error:any,req:Request,res:Response,next:NextFunction) {
    if(error instanceof DatabaseError){
        res.sendStatus(StatusCodes.BAD_REQUEST)

    }else if(error instanceof ForbittenErrorRout){
        console.log('forbitem error')
        res.sendStatus(StatusCodes.FORBIDDEN)

    }else{
        console.log('erro do server')
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }

    
}

export = errorhandle