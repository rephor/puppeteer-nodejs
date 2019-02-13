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
const puppeteer = require("puppeteer");
const config = require('../config.json');
const MQueryCtrl1_dgView = '#MQueryCtrl1_dgView';
function getData(area, filterBIno) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield (puppeteer.launch({
            executablePath: config.chromRoute,
            timeout: 15000,
            ignoreHTTPSErrors: true,
            devtools: false,
            headless: true
        }));
        const page = yield browser.newPage();
        yield page.goto('http://query.customs.gov.cn/MNFTQ/MQuery.aspx');
        const selectData = area;
        yield page.type('#MQueryCtrl1_ddlCustomCode', selectData, { delay: 0 });
        const deliveryNumbers = filterBIno;
        yield page.type('#MQueryCtrl1_txtChildNo', deliveryNumbers, { delay: 0 });
        yield page.keyboard.press('Enter');
        yield page.waitForSelector(MQueryCtrl1_dgView);
        const text = yield page.evaluate(sel => {
            const catBoxs = Array.from($(sel).find('tr td'));
            const ctn = catBoxs.map(v => {
                return v.innerText.replace(/\s/g, '');
            });
            return ctn;
        }, MQueryCtrl1_dgView);
        browser.close();
        try {
            return {
                "status": 1,
                "message": '查询成功',
                "chuanming": text[15],
                "tidanhao": text[17],
                "chuanbobianhao": '',
                "hangci": text[16],
                "jianshu": parseInt(text[19]),
                "jingzhong": text[20],
                "xianghao": []
            };
        }
        catch (e) {
            console.log(e);
            return {
                "status": 1,
                "message": '查询不到该订单',
                "chuanming": '',
                "tidanhao": '',
                "chuanbobianhao": '',
                "hangci": '',
                "jianshu": 0,
                "jingzhong": '',
                "xianghao": []
            };
        }
    });
}
exports.getData = getData;
//# sourceMappingURL=main.js.map