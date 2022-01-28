import { NextFunction, Request, Response } from "express";
import { request } from "http";
import ForbittenErrorRout from "../models/errors/ForbittenErrorRout";
import UserRepositori from '../repositories/UserRepositori'



async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const autorizaHeader = req.headers['authorization'];
        console.log(autorizaHeader)

        if (!autorizaHeader) {
            console.log('deu erro')
            throw new ForbittenErrorRout('Cledenciais nao informadas')
        } else {
            const [type, token] = autorizaHeader.split(' ')
            if (type !== 'Basic' || !token) {
                throw new ForbittenErrorRout('tipo de authenticação invalida');
            }
            const tokencontent = Buffer.from(token, 'base64').toString('utf-8')
            const [username, password] = tokencontent.split(':');
            if (!username || !password) {
                throw new ForbittenErrorRout("Cledenciais nao preenchidas");

            }
            const user = await UserRepositori.findUserBynameAndPassword(username, password);
            if (!user) {
                console.log(user)
                throw new ForbittenErrorRout('usuario ou senha invalidos');

            }
            req.user = user;
            next();

            
        }
        

    } catch (error) {
        next(error)
    }

}
export default basicAuthenticationMiddleware;