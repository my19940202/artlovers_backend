"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var dishes_1 = require("./dishes");
var util_1 = require("./util");
var app = express();
var config = {
    port: 8700
};
// 研究下app.router 像数据中心一下转发的请求 每个清单单独一个文件处理
// 使用router隔离接口 http://www.expressjs.com.cn/4x/api.html#router
// https://juejin.im/post/59bce4c45188257e8b36a0f3#heading-6
app.get('/', function (req, res) {
    util_1.mlog("req /");
    res.sendFile(path.join(__dirname + '/../html/index.html'));
});
app.get('/static/test', function (req, res) {
    util_1.mlog("req /static/test");
    res.sendFile(path.join(__dirname + '/../html/index.html'));
});
app.use('/api/tools', dishes_1["default"]);
app.listen(config.port, function () {
    util_1.mlog("server is listening on port " + config.port);
});
