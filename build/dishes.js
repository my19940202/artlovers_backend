"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var log4js = require("log4js");
var util_1 = require("./util");
var lodash_1 = require("lodash");
var moment = require("moment");
var bodyParser = require("body-parser");
var app = express();
log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { "default": { appenders: ['dishes'], level: 'debug' } }
});
var logger = log4js.getLogger('dishes');
var dishesApi = express.Router();
dishesApi.use(function (req, res, next) {
    // const userIsAllowed = true || ALLOWED_IPS.indexOf(req.ip) !== -1;
    var userIsAllowed = true;
    if (!userIsAllowed) {
        res.status(401).send("Not authorized!");
    }
    else {
        next();
    }
});
function formartResJson(json, err) {
    var ret = {
        data: [],
        errno: 1,
        msg: err || 'no data'
    };
    if (!lodash_1.isEmpty(json)) {
        ret = {
            data: json,
            errno: 0,
            msg: 'no data'
        };
    }
    return ret;
}
dishesApi.get('/dishes/list', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, util_1.query("\n        select id, name, `desc`, ingredients, DATE_FORMAT(createtime, \"%Y-%m-%d %T\") as createtime\n        from dishes\n    ".trim())];
            case 1:
                _a = _b.sent(), rows = _a.rows, err = _a.err;
                logger.info("req dishes/list");
                res.json(formartResJson(rows, err));
                return [2 /*return*/];
        }
    });
}); });
dishesApi["delete"]('/dishes/remove', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, rows, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.query.id;
                return [4 /*yield*/, util_1.query(("\n        DELETE FROM dishes WHERE id = " + id + "\n    ").trim())];
            case 1:
                _a = _b.sent(), rows = _a.rows, err = _a.err;
                logger.info("req dishes/remove");
                res.json(formartResJson(rows, err));
                return [2 /*return*/];
        }
    });
}); });
// bodyParser.json() // for parsing application/json
// bodyParser.urlencoded({ extended: true } // for parsing application/x-www-form-urlencoded
dishesApi.post('/dishes/add', bodyParser.json(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, desc, ingredients, createtime, sql, _b, rows, err;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, desc = _a.desc, ingredients = _a.ingredients;
                createtime = moment().format("YYYY-MM-DD HH:mm:ss");
                sql = ("\n        INSERT INTO dishes (`name`, `desc`, `ingredients`, `createtime`)\n        VALUES ('" + name + "', '" + desc + "', " + ingredients + ", '" + createtime + "')\n    ").trim();
                return [4 /*yield*/, util_1.query(sql)];
            case 1:
                _b = _c.sent(), rows = _b.rows, err = _b.err;
                logger.info("req dishes/list");
                res.json(formartResJson(rows, err));
                return [2 /*return*/];
        }
    });
}); });
dishesApi.get('/ingredients/list', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, util_1.query('select * from ingredient')];
            case 1:
                _a = _b.sent(), rows = _a.rows, err = _a.err;
                logger.info("req ingredients/list");
                res.json(formartResJson(rows, err));
                return [2 /*return*/];
        }
    });
}); });
dishesApi.post('/ingredients/add', bodyParser.json(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, desc, startMonth, endMonth, sql, _b, rows, err;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, desc = _a.desc, startMonth = _a.startMonth, endMonth = _a.endMonth;
                sql = ("\n        INSERT INTO ingredient (`name`, `desc`, `startMonth`, `endMonth`)\n        VALUES ('" + name + "', '" + desc + "', " + startMonth + ", " + endMonth + ")\n    ").trim();
                return [4 /*yield*/, util_1.query(sql)];
            case 1:
                _b = _c.sent(), rows = _b.rows, err = _b.err;
                logger.info("post /ingredients/add");
                res.json(formartResJson(rows, err));
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = dishesApi;
