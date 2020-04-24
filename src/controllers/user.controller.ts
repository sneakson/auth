import { User } from "../entities/user";
import bcrypt from "bcrypt";

export const users = new Map();

export class UserController {
    constructor(){

    }

    public async create(user: User): Promise<User>{
        user.password = this.hashPassword(user.password);
        users.set(user.username, user);

        user = new User(user);
        delete user.password;

        return user;
    }

    private hashPassword(password: string): string{
        return bcrypt.hashSync(password, 10);
    }

    public async getWithCreds(username: string): Promise<User> {
        return users.get(username);
    }

    public async get(username: string): Promise<User> {
        const userInDb = users.get(username);
        let cleanUser;
        if(userInDb){
            cleanUser = new User(userInDb);
            delete cleanUser.password;
        }
        return cleanUser;
    }

    public async getAll(): Promise<User[]> {
        let usersInDb: User[] = [];
        users.forEach((value => {
            const cleanUser = new User(value);
            delete cleanUser.password;
            usersInDb.push(cleanUser);
        }));
        return usersInDb;
    }

    public async update(user: User): Promise<User> {
        const userInDb = await this.get(user.username);
        if(!userInDb){
            return null;
        }

        user.password = this.hashPassword(user.password);
        users.set(user.username, user);

        const cleanUser = new User(user);
        delete cleanUser.password;

        return cleanUser;
    }

    public async delete(username: string): Promise<boolean> {
        if(users.has(username)){
            users.delete(username);
            return true;
        }else{
            return false;
        }
    }
}