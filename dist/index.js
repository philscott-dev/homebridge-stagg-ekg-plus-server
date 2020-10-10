"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Kettle_1 = __importDefault(require("./Kettle"));
const middleware_1 = require("./middleware");
const PORT = process.env.PORT || 8080;
const MAC = process.env.MAC_ADDRESS || '';
(async () => {
    try {
        const kettle = new Kettle_1.default(MAC);
        const app = express_1.default();
        app.use(body_parser_1.default.json());
        app.get('/api/status', middleware_1.asyncHandler(async (_req, res) => {
            const status = kettle.getStatus();
            res.json(status);
        }));
        app.post('/api/power', middleware_1.asyncHandler(async (req, res) => {
            const { targetState } = req.body;
            const powerState = parseInt(targetState, 10);
            await kettle.setPower(powerState);
            console.log({ powerState });
            res.json({ powerState });
        }));
        app.post('/api/temperature', middleware_1.asyncHandler(async (req, res) => {
            const { targetTemp } = req.body;
            const temperature = parseInt(targetTemp, 10);
            await kettle.setTemp(temperature);
            console.log({ temperature });
            res.json({ temperature });
        }));
        app.listen(PORT, () => console.log(`server listening on ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDMUIsc0RBQTZCO0FBQzdCLDhEQUFvQztBQUNwQyxzREFBNkI7QUFDN0IsNkNBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQTtBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBRXhDO0FBQUEsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFOUIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBYSxFQUNiLHlCQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFBO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FDTixZQUFZLEVBQ1oseUJBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDNUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUNILENBQUE7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUNOLGtCQUFrQixFQUNsQix5QkFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7WUFDL0IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUM1QyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNuRTtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNqQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUEifQ==