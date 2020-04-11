import { User } from "../entities/user";
import bcrypt from "bcrypt";

export const users = new Map();

export class UserController {
    constructor(){

    }

    public create(user: User): Promise<User>{
        return new Promise( (resolve, reject) =>{
            bcrypt.hash(user.password, 10, (err, encrypted) => {
                if(err) {
                    reject(err);
                }

                user.password = encrypted;
                users.set(user.username, user);

                user = new User(user);
                delete user.password;

                resolve(user);
            });
        });
    }

    public get(username: string): Promise<User> {
        return new Promise( (resolve, reject) => {
           const userInDB = users.get(username);
           resolve(userInDB);
        });
    }


}