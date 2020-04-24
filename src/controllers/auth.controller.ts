import { UserController } from '../controllers/user.controller';
import {User} from "../entities/user";
import bcrypt from "bcrypt";
const userController = new UserController();

export class AuthController {
    constructor(){

    }

    public async login(login: User): Promise<boolean> {
        const userInDb = await userController.getWithCreds(login.username);
        if(!userInDb){
            throw new Error(`${login.username} not registered`);
        }

        return this.comparePassword(login.password, userInDb.password);
    }

    private async comparePassword(testHash: string, storedHash: string): Promise<boolean>{
        return await bcrypt.compare(testHash, storedHash);
    }
}