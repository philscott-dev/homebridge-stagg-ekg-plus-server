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
            await kettle.setPower(parseInt(targetState, 10));
            res.status(200);
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
            res.status(200);
        }));
        app.listen(PORT, () => console.log(`server listening on ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDMUIsc0RBQTZCO0FBQzdCLDhEQUFvQztBQUNwQyxzREFBNkI7QUFDN0IsNkNBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQTtBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBRXhDO0FBQUEsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFOUIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBYSxFQUNiLHlCQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQ04sWUFBWSxFQUNaLHlCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUNoQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQ04sa0JBQWtCLEVBQ2xCLHlCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUMvQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzVDLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxHQUFHO3FCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHFDQUFxQyxFQUFFLENBQUMsQ0FBQTthQUMxRDtZQUNELElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxHQUFHO3FCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGtDQUFrQyxFQUFFLENBQUMsQ0FBQTthQUN2RDtZQUVELE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLENBQUMsQ0FBQyxDQUNILENBQUE7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDbkU7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDakI7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFBIn0=