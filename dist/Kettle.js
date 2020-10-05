"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noble_1 = __importDefault(require("@abandonware/noble"));
const hex_1 = require("./helpers/hex");
const enum_1 = require("./enum");
class Kettle {
    constructor(macAddress) {
        this.step = 0;
        this.cycle = 0;
        this.currentTemp = 32;
        this.targetTemp = 205;
        this.isScanning = false;
        /**
         * Noble Methods
         */
        this.onScanStart = () => {
            this.isScanning = true;
        };
        this.onScanStop = () => {
            this.isScanning = false;
        };
        this.onWarning = (warning) => {
            console.log(warning);
        };
        this.onStateChange = async (state) => {
            if (state === 'poweredOn') {
                await noble_1.default.startScanningAsync([], false);
            }
        };
        this.onDiscover = async (peripheral) => {
            if ([peripheral.id, peripheral.address].includes(this.macAddress)) {
                await noble_1.default.stopScanningAsync();
                this.peripheral = peripheral;
                this.peripheral.on('connect', this.onConnect);
                this.peripheral.on('disconnect', this.onDisconnect);
                await this.peripheral.connectAsync();
                const discovered = await this.peripheral.discoverSomeServicesAndCharacteristicsAsync(['1820'], ['2a80']);
                this.characteristic = discovered.characteristics[0];
                this.characteristic.on('data', this.onData);
                await this.characteristic.subscribeAsync();
                await this.characteristic.writeAsync(Buffer.from('efdd0b3031323334353637383930313233349a6d', 'hex'), true);
            }
        };
        /**
         * Peripheral Methods
         */
        this.onConnect = (err) => {
            console.log('Kettle: Connected');
            if (err)
                console.log(err);
        };
        this.onDisconnect = async (err) => {
            console.log('Kettle: Disonnected');
            if (err)
                throw err;
            // try reconnecting
            await noble_1.default.startScanningAsync([], false);
        };
        /**
         * Characteristic Methods
         */
        this.authenticate = async () => {
            var _a;
            const buff = Buffer.from('efdd0b3031323334353637383930313233349a6d', 'hex');
            await ((_a = this.characteristic) === null || _a === void 0 ? void 0 : _a.writeAsync(buff, true));
        };
        this.setPower = async (targetState) => {
            var _a;
            this.step = 0;
            const on = Buffer.from('efdd0a0000010100', 'hex');
            const off = Buffer.from('efdd0a0400000400', 'hex');
            const buff = targetState === enum_1.PowerState.On ? on : off;
            await ((_a = this.characteristic) === null || _a === void 0 ? void 0 : _a.writeAsync(buff, true));
        };
        this.setTemp = async (temp) => {
            var _a;
            this.step = this.step + 1;
            const s = hex_1.numberToHex(this.step);
            const t = hex_1.numberToHex(temp);
            const w = hex_1.numberToHex(this.step + temp).slice(-2);
            const string = `efdd0a${s}01${t}${w}01`;
            const buff = Buffer.from(string, 'hex');
            await ((_a = this.characteristic) === null || _a === void 0 ? void 0 : _a.writeAsync(buff, true));
        };
        this.getStatus = () => {
            console.log(this.targetTemp, this.currentTemp);
            return {
                targetTemp: this.targetTemp,
                currentTemp: this.currentTemp,
                powerState: this.currentTemp === 32 ? enum_1.PowerState.Off : enum_1.PowerState.On,
            };
        };
        /**
         * Handle Data
         */
        this.onData = (buff) => {
            const hex = buff.toString('hex');
            this.cycle = hex === 'ffffffff' ? 0 : this.cycle + 1;
            if (this.cycle === 2) {
                this.currentTemp = hex_1.hexToNumber(hex);
                console.log(`Current Temp: ${this.currentTemp}`);
            }
            else if (this.cycle === 4) {
                this.targetTemp = hex_1.hexToNumber(hex);
            }
        };
        this.macAddress = macAddress.toLowerCase();
        noble_1.default.on('scanStart', this.onScanStart);
        noble_1.default.on('scanStop', this.onScanStop);
        noble_1.default.on('warning', this.onWarning);
        noble_1.default.on('stateChange', this.onStateChange);
        noble_1.default.on('discover', this.onDiscover);
    }
}
exports.default = Kettle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V0dGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tldHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFzRTtBQUN0RSx1Q0FBd0Q7QUFDeEQsaUNBQW1DO0FBRW5DLE1BQXFCLE1BQU07SUFVekIsWUFBWSxVQUFrQjtRQVR0QixTQUFJLEdBQVcsQ0FBQyxDQUFBO1FBQ2hCLFVBQUssR0FBVyxDQUFDLENBQUE7UUFDakIsZ0JBQVcsR0FBVyxFQUFFLENBQUE7UUFDeEIsZUFBVSxHQUFXLEdBQUcsQ0FBQTtRQUN4QixlQUFVLEdBQVksS0FBSyxDQUFBO1FBY25DOztXQUVHO1FBRUgsZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDeEIsQ0FBQyxDQUFBO1FBRUQsZUFBVSxHQUFHLEdBQUcsRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUN6QixDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQUVELGtCQUFhLEdBQUcsS0FBSyxFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ3RDLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtnQkFDekIsTUFBTSxlQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsZUFBVSxHQUFHLEtBQUssRUFBRSxVQUFzQixFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pFLE1BQU0sZUFBSyxDQUFDLGlCQUFpQixFQUFFLENBQUE7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUVuRCxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQ3BDLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQywyQ0FBMkMsQ0FDbEYsQ0FBQyxNQUFNLENBQUMsRUFDUixDQUFDLE1BQU0sQ0FBQyxDQUNULENBQUE7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUMzQyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBQzFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMENBQTBDLEVBQUUsS0FBSyxDQUFDLEVBQzlELElBQUksQ0FDTCxDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUE7UUFFRDs7V0FFRztRQUVILGNBQVMsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUNoQyxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMzQixDQUFDLENBQUE7UUFFRCxpQkFBWSxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDbEMsSUFBSSxHQUFHO2dCQUFFLE1BQU0sR0FBRyxDQUFBO1lBQ2xCLG1CQUFtQjtZQUNuQixNQUFNLGVBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDM0MsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFFSCxpQkFBWSxHQUFHLEtBQUssSUFBSSxFQUFFOztZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzNFLGFBQU0sSUFBSSxDQUFDLGNBQWMsMENBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUcsS0FBSyxFQUFFLFdBQW1CLEVBQUUsRUFBRTs7WUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7WUFDYixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDbEQsTUFBTSxJQUFJLEdBQUcsV0FBVyxLQUFLLGlCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtZQUNyRCxhQUFNLElBQUksQ0FBQyxjQUFjLDBDQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUE7UUFDbkQsQ0FBQyxDQUFBO1FBRUQsWUFBTyxHQUFHLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTs7WUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUN6QixNQUFNLENBQUMsR0FBRyxpQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoQyxNQUFNLENBQUMsR0FBRyxpQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLGlCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7WUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdkMsYUFBTSxJQUFJLENBQUMsY0FBYywwQ0FBRSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQTtRQUVELGNBQVMsR0FBRyxHQUFHLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzlDLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFVLENBQUMsRUFBRTthQUNyRSxDQUFBO1FBQ0gsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFFSCxXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUNwRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO2FBQ2pEO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNuQztRQUNILENBQUMsQ0FBQTtRQXJIQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMxQyxlQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkMsZUFBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3JDLGVBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNuQyxlQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDM0MsZUFBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FnSEY7QUFqSUQseUJBaUlDIn0=