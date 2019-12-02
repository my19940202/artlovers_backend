"use strict";
exports.__esModule = true;
var express = require("express");
var log4js = require("log4js");
var dishes_1 = require("./dishes");
log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { "default": { appenders: ['dishes'], level: 'debug' } }
});
var app = express();
var config = {
    port: 8700
};
// 研究下app.router 像数据中心一下转发的请求 每个清单单独一个文件处理
// 使用router隔离接口 http://www.expressjs.com.cn/4x/api.html#router
// https://juejin.im/post/59bce4c45188257e8b36a0f3#heading-6
var logger = log4js.getLogger('dishes');
app.get('/', function (req, res) {
    logger.info("req /////");
    res.send('hello world');
});
app.use('/dishes', dishes_1["default"]);
app.listen(config.port, function () {
    // console.log(`server is listening on port ${port}!`
    logger.info("server is listening on port " + config.port);
});
