import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();
const port = 3003;

app.use(express.json());
app.use(session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: true
}));

let users = new Map();

app.post('/register', (req, res) => {
    let userInfo = req.body;

    bcrypt.hash(userInfo.password, 10, (err, encrypted) => {
        if(err) {
            throw err;
        }

        userInfo.password = encrypted;
        users.set(userInfo.username, userInfo);

        res.send(`User ${userInfo.username} created`);
    });
});

app.post('/login', (req, res) => {
    let login = req.body;
    let password = login.password;
    let storedHash = users.get(login.username).password;

    if(storedHash){
        bcrypt.compare(password, storedHash, (err, same) => {
            if(err) {
                throw err;
            }

            if(same){
                req!.session!.username = login.username;
                res.send(`${login.username} successfully logged in`);
            }
        });
    }else{
        res.send(`${login.username} not registered`);
    }
});

app.get('/whoami', (req, res) => {
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

app.delete('/logout', (req, res) => {
    if(req.session){
        console.log("Logging " + req.session.username + " out.");
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.send({msg: 'successfully logged out'});
        });
    }else{
        res.send('Not logged in');
    }
});

app.listen(port, () => console.log(`Auth listening on port ${port}!`));
