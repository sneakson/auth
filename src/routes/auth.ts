import { Router } from "express";
import session from "express-session";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.use(session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: true
}));

router.post('/login', (req, res) => {
    const login = req.body;

    authController.login(login).then((loggedIn) => {
        if(loggedIn){
            req.session.username = login.username;
            return res.send(`${login.username} successfully logged in`);
        }else{
            return res.status(401).send(`Incorrect Password`);
        }
    }).catch((err: Error) => {
        return res.status(400).send(err.message);
    });
});

router.get('/whoami', (req, res) => {
    if(!req.session){
        res.send('Not Logged in');
        return;
    }

    if (!req.session.username) {
        res.send("Not logged in.");
    } else {
        res.send("Logged in as " + req.session.username);
    }
});

router.delete('/logout', (req, res) => {
    if(req.session){
        console.log("Logging " + req.session.username + " out.");
        req.session.destroy((err) => {
            if (err) {
                throw err;
            }
            return res.send({msg: 'successfully logged out'});
        });
    }else{
        return res.send('Not logged in');
    }
});

export const AuthRouter = router;