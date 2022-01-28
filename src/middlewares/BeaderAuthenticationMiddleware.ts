import { NextFunction, Request, Response } from "express"
import ForbittenErrorRout from "../models/errors/ForbittenErrorRout"
import jsonwebtoken from "jsonwebtoken";
import UserRepositiri from "../repositories/UserRepositori"



async function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const autorizaHeader = req.headers['authorization'];

        if (!autorizaHeader) {
            throw new ForbittenErrorRout('Cledenciais nao informadas')
        }
        const [type, token] = autorizaHeader.split(' ')

        if (type !== 'Bearer' || !token) {
            throw new ForbittenErrorRout('tipo de authenticação invalida');
        }
        if (!token) {
            throw new ForbittenErrorRout('Token e invalido');
        } else {
            const secretKey = 'my_secret_key'

            const tokenPayload = jsonwebtoken.verify(token,secretKey) // verifica o token tem que passar ele 
            // + a nossa scret key 
            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbittenErrorRout('Token e invalido');
                
            }
            const uuid =  tokenPayload.sub; // retorna o id 
            const user = await UserRepositiri.finduserbyid(uuid);

            req.user = user;

        }



        next()
    } catch (error) {
        next(error)
    }

}
export default AuthenticationMiddleware;