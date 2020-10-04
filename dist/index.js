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
            res.json({});
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
            if (temperature > 212) {
                return res
                    .status(422)
                    .json({ error: 'Temperature must be at or below 212' });
            }
            if (temperature < 104) {
                return res
                    .status(422)
                    .json({ error: 'Temperature must at or above 104' });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDMUIsc0RBQTZCO0FBQzdCLDhEQUFvQztBQUNwQyxzREFBNkI7QUFDN0IsNkNBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQTtBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBRXhDO0FBQUEsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFOUIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBYSxFQUNiLHlCQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQ04sWUFBWSxFQUNaLHlCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUNoQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzVDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FDSCxDQUFBO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FDTixrQkFBa0IsRUFDbEIseUJBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQy9CLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDNUMsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixPQUFPLEdBQUc7cUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUscUNBQXFDLEVBQUUsQ0FBQyxDQUFBO2FBQzFEO1lBQ0QsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixPQUFPLEdBQUc7cUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZEO1lBRUQsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO1lBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQUE7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDbkU7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDakI7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFBIn0=