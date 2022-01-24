import User from "../models/user_model";

import db from '../db'

class UserRepositori{
    async findusers():Promise<User[]>{
        const query = 'SELECT uuid,user_name FROM app_user'
        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];


    }
    
}



export  = new UserRepositori();
