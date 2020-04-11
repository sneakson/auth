import express from 'express';
import { AuthRouter } from './routes/auth';
import { UserRouter } from "./routes/user";

const app = express();
const port = 3003;

app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

app.listen(port, () => console.log(`Auth listening on port ${port}!`));

export const App = app;
