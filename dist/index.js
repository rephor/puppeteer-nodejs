"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const main_1 = require("./main");
const app = express();
app.use(bodyParser.json());
app.get('/grab', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield main_1.getData(req.query.area, req.query.filterBIno);
    }
    catch (e) {
        console.log(e);
        res.send({ "status": 0, "message": "服务异常" });
    }
    res.send(result);
}));
app.listen(3000);
console.log("Express application is up and running on port 3000");
//# sourceMappingURL=index.js.map