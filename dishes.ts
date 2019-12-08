import * as express from 'express';
import * as log4js from 'log4js';
import {query} from './util';
import {isEmpty} from 'lodash';
import * as moment from 'moment';

import * as bodyParser from 'body-parser';
const app = express();

log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { default: { appenders: ['dishes'], level: 'debug' } }
});

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
function formartResJson(json) {
    let ret = {
        data: [],
        errno: 1,
        msg: 'no data'
    };
    if (!isEmpty(json)) {
        ret = {
            data: json,
            errno: 0,
            msg: 'no data'
        }
    }
    return ret;
}

dishesApi.get('/dishes/list', async (req, res)  => {
    // mysql format格式: %T https://www.w3school.com.cn/sql/func_date_format.asp
    const rows: any = await query(`
        select id, name, ingredients, DATE_FORMAT(createtime, "%Y-%m-%d %T") as createtime from dishes
    `.trim());
    logger.info(`req dishes/list`);
    res.json(formartResJson(rows))
});

// dishesApi.delete('/dishes/list', async (req, res)  => {
//     const rows: any = await query(`
//         select id, name, ingredients, DATE_FORMAT(createtime, "%Y-%m-%d %T") as createtime from dishes
//     `.trim());
//     logger.info(`req dishes/list`);
//     res.json(formartResJson(rows))
// });

// bodyParser.json() // for parsing application/json
// bodyParser.urlencoded({ extended: true } // for parsing application/x-www-form-urlencoded
dishesApi.post('/dishes/add', bodyParser.json(), async (req, res) => {
    // TODO 后面再去加photo字段
    const {name, desc,ingredients} = req.body;
    const createtime = moment().format("YYYY-MM-DD HH:mm:ss");
    let sql = `
        INSERT INTO dishes (\`name\`, \`desc\`, \`ingredients\`, \`createtime\`)
        VALUES ('${name}', '${desc}', ${ingredients}, '${createtime}')
    `.trim();
    const rows: any = await query(sql);
    logger.info(`req dishes/list`);
    res.json(formartResJson(rows))
});


dishesApi.get('/ingredients/list', async (req, res)  => {
    const rows: any = await query('select * from ingredient');
    logger.info(`req ingredients/list`);
    res.json(formartResJson(rows))
});

dishesApi.post('/ingredients/add', bodyParser.json(), async (req, res)  => {
    const {name, desc,startMonth, endMonth} = req.body;
    let sql = `
        INSERT INTO ingredient (\`name\`, \`desc\`, \`startMonth\`, \`endMonth\`)
        VALUES ('${name}', '${desc}', ${startMonth}, ${endMonth})
    `.trim();
    const rows: any = await query(sql);
    console.log(rows, 'rows');
    logger.info(`post /ingredients/add`);
    res.json(formartResJson({}))
});

dishesApi.get('/delete', (req, res)  => {
    res.json('fuck you delte')
});

export default dishesApi;
