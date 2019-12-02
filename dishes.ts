import * as express from 'express';
import * as log4js from 'log4js';
import {query} from './util';

log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { default: { appenders: ['dishes'], level: 'debug' } }
});
// const ALLOWED_IPS = [
//     "127.0.0.1",
//     "123.456.7.89"
// ];
const logger = log4js.getLogger('dishes');
const dishesApi = express.Router();
dishesApi.use((req, res, next) => {
    // const userIsAllowed = true || ALLOWED_IPS.indexOf(req.ip) !== -1;
    const userIsAllowed = true;
    if(!userIsAllowed) {
        res.status(401).send("Not authorized!");
    } else {
        next();
    }
});
dishesApi.get('/list', async (req, res)  => {
    const rows = await query('select * from dishes');
    res.json(rows)
});

dishesApi.get('/delete', (req, res)  => {
    res.json('fuck you delte')
});

export default dishesApi;
