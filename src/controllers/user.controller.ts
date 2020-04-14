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
                    return;
                }

                user.password = encrypted;
                users.set(user.username, user);

                user = new User(user);
                delete user.password;

                resolve(user);
            });
        });
    }

    public getWithCreds(username: string): Promise<User> {
        return new Promise( (resolve, reject) => {
           const userInDB = users.get(username);
           resolve(userInDB);
        });
    }

    public get(username: string): Promise<User> {
        return new Promise( (resolve, reject) => {
            const userInDb = users.get(username);
            let cleanUser;
            if(userInDb){
                cleanUser = new User(userInDb);
                delete cleanUser.password;
            }
            resolve(cleanUser);
        });
    }

    public getAll(): Promise<User[]> {
        return new Promise( (resolve, reject) => {
            let usersInDb: User[] = [];
            users.forEach((value => {
                const cleanUser = new User(value);
                delete cleanUser.password;
                usersInDb.push(cleanUser);
            }));
            resolve(usersInDb);
        });
    }

    public update(user: User): Promise<User> {
        return new Promise( async (resolve, reject) => {
            const userInDb = await this.get(user.username);
            if(!userInDb){
                resolve(null);
                return;
            }

            user.password = bcrypt.hashSync(user.password, 10);
            users.set(user.username, user);

            const cleanUser = new User(user);
            delete cleanUser.password;

            resolve(cleanUser);
        });
    }

    public delete(username: string): Promise<boolean> {
        return new Promise( async (resolve, reject) => {
            if(users.has(username)){
                users.delete(username);
                resolve(true);
                return;
            }else{
                resolve(false);
            }
        });
    }
}