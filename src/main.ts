import * as puppeteer from 'puppeteer';

const config = require('../config.json');

const MQueryCtrl1_dgView = '#MQueryCtrl1_dgView';
/**
 * 爬取数据
 * @param area 关区代码
 * @param filterBIno 提单号
 */
async function getData(area: string, filterBIno: string) {

    const browser = await (puppeteer.launch({
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        executablePath: config.chromRoute,
        //设置超时时间
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: true
    }));

    const page = await browser.newPage();
    await page.goto('http://query.customs.gov.cn/MNFTQ/MQuery.aspx');

    const selectData = area;
    await page.type('#MQueryCtrl1_ddlCustomCode', selectData, { delay: 0 });

    const deliveryNumbers = filterBIno;
    await page.type('#MQueryCtrl1_txtChildNo', deliveryNumbers, { delay: 0 });

    await page.keyboard.press('Enter');

    await page.waitForSelector(MQueryCtrl1_dgView);

    const text: Array<any> = await page.evaluate(sel => {
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
    } catch (e) {
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
}

export { getData };