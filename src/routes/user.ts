import bcrypt from "bcrypt";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {User} from "../entities/user";

const router = Router();
const controller = new UserController();

router.post('/', (req, res) => {
    let userInfo: User = req.body;

    controller.create(userInfo).then((user) => {
        res.send(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

export const UserRouter = router;