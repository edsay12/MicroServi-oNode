import { NextFunction, Request, Response, Router } from "express";
import { buffer } from "stream/consumers";
import ForbittenErrorRout from "../models/errors/ForbittenErrorRout";
import UserRepositori from "../repositories/UserRepositori";
import jsonwebtoken from "jsonwebtoken";
import { DatabaseError } from "pg";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/BasicAuthenticationMiddleware";
const autoriza = Router();

autoriza.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = req.user
        if(!user){
            throw new ForbittenErrorRout('Usuario nao informado');
            
        }
        const payload = { username: user.user_name }
        const secretKey = 'my_secret_key'
        const options = { subject: user?.uuid }
        const jwt = jsonwebtoken.sign(payload, secretKey, options)
        res.status(StatusCodes.OK).json({ token: jwt })
    }catch (error) {
    next(error)

}
    
})
export default autoriza