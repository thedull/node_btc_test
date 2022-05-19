import express from 'express';
import jwt from 'jsonwebtoken'; 
import btcStats from '../lib/btc-stats/btc';
import authJwt from './authJwt';
import { users, Role, IUser } from './users';

const app = express();
app.use(express.json());

app.get('/btc-stats', authJwt, async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { start, end } = req.query;
    const [startDate, endDate] = [start?.toString(), end?.toString()];

    const btcData = await btcStats(startDate!, endDate!);
    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(btcData);
});

app.post('/login', (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    const user = users.find(user => {
        return user.username === username && user.password === password;
    });

    if (!user) return res.sendStatus(401);

    const accessToken = jwt.sign({
        username: user.username,
        role: user.role 
    }, 'Acc3ssT0k3nS3cr3t');
    return res.json({ accessToken});
});

app.get('/admin', authJwt, (req: express.Request, res: express.Response) => {
    const { role } = ((req as any).user) as IUser;

    if (role !== 'admin') return res.status(403);
    return res.send('Hello, admin');
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
