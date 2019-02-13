import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { getData } from "./main";

const app = express();
app.use(bodyParser.json());

// http://localhost:3000/grab?action=newpycd&area=0217&filterBIno=TXOD000382
app.get('/grab', async (req: any, res: any) => {
    let result: object;
    try {
        result = await getData(req.query.area, req.query.filterBIno);
    } catch (e) {
        console.log(e);
        res.send({ "status": 0, "message": "服务异常" });
    }
    res.send(result);
});

app.listen(3000);
console.log("Express application is up and running on port 3000");
