import User from "../models/user_model";

import db from '../db'

import DatabaseError from "../models/errors/DataBaseErrorModule";


class UserRepositori{
    async findusers():Promise<User[]>{
        const query = 'SELECT uuid,user_name FROM app_user'
        try{
            const {rows} = await db.query<User>(query);
            return rows || [];
        }catch(error){
           throw new DatabaseError('Erro na consulta por id',error)
        }
    }
    async finduserbyid(id:String):Promise<User[]>{
        const query = `SELECT uuid,user_name from app_user where uuid = $1`
        const values = [id];
        try{
            const {rows} = await db.query<User>(query,values);
            return rows;
        }catch(error){
            console.log(error)
            throw new DatabaseError('Erro na consulta por id',error)
        }
    }
    async insernewuser(user:User):Promise<String>{
        const script = `
        INSERT INTO 
        app_user(user_name,password) 
        VALUES ($1,crypt($2,'my_salt'))
        RETURNING uuid
        `
        const values = [user.user_name,user.password]
        const {rows} = await db.query<{uuid:String}>(script,values)

        return rows[0].uuid

    }
    
    async updateuser(user:User):Promise<void>{
        const script = `
        UPDATE app_user 
        SET user_name = $1 , password = crypt($2,'my_salt') where uuid = $3
        `
        const values = [user.user_name,user.password,user.uuid]
        try{
            await db.query<{uuid:String}>(script,values)
        }catch(e){
            console.log(e)
        }


    }
    async deleteuser(uuid:String):Promise<void>{
        const script = `
        DELETE FROM app_user where uuid = $1
        `
        const values = [uuid]
        try{
            await db.query<{uuid:String}>(script,values)
        }catch(e){
            console.log(e)
        }


    }
    
}



export  = new UserRepositori();
