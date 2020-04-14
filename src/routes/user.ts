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

router.get('/', (req, res) => {
   controller.getAll().then((users) => {
       res.send(users);
   }).catch((err) => {
       console.error(err);
       res.status(500).send('Internal Server Error');
   });
});

router.get('/:id', (req, res) => {
    controller.get(req.params.id).then((user) => {
        if(!user){
            return res.status(204);
        }
        return res.send(user);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    });
});

router.put('/', (req, res) => {
    const input: User = req.body;
    controller.update(input).then((user) => {
        if(!user){
            return res.status(400).send('User not found');
        }

        return res.send(user);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    });
});

router.delete('/:id', (req, res) => {
    controller.delete(req.params.id).then((deleted) => {
        if(deleted){
            res.send('Successfully Deleted');
        }else{
            res.status(400).send('User not found');
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

export const UserRouter = router;