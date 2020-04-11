import { UserController } from '../controllers/user.controller';
import {User} from "../entities/user";
import bcrypt from "bcrypt";
const userController = new UserController();

export class AuthController {
    constructor(){

    }

    public async login(login: User): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const userInDb = await userController.get(login.username);
            if(!userInDb){
                reject(`${login.username} not registered`);
                return;
            }

            resolve(this.comparePassword(login.password, userInDb.password));
        });
    }

    private async comparePassword(testHash: string, storedHash: string): Promise<boolean>{
        return await bcrypt.compare(testHash, storedHash);
    }
}