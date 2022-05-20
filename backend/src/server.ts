import express from 'express';
import cors from 'cors';
import btcStats from '../lib/btc-stats/btc';

const app = express();
app.use(cors());

app.get('/btc-stats', async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { start, end } = req.query;
    const [startDate, endDate] = [start?.toString(), end?.toString()];

    const btcData = await btcStats(startDate!, endDate!);
    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(btcData);
});

app.listen(3001, () => console.log('Server running at http://localhost:3001'));
