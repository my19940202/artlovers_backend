import * as express from 'express';
import * as log4js from 'log4js';
import * as path from 'path';
import dishesApi from './dishes';

log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { default: { appenders: ['dishes'], level: 'debug' } }
});
const app = express();
const config = {
    port: 8700
};

// 研究下app.router 像数据中心一下转发的请求 每个清单单独一个文件处理
// 使用router隔离接口 http://www.expressjs.com.cn/4x/api.html#router
// https://juejin.im/post/59bce4c45188257e8b36a0f3#heading-6
const logger = log4js.getLogger('dishes');
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../html/index.html'))
});
app.get('/static/test', function(req, res){
    res.sendFile(path.join(__dirname + '/../html/index.html'))
});
app.use('/api/tools', dishesApi);

app.listen(config.port, () => {
    // console.log(`server is listening on port ${port}!`
    logger.info(`server is listening on port ${config.port}`);
});
