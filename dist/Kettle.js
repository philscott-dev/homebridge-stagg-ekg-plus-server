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
        this.step = 0;
        this.cycle = 0;
        this.currentTemp = 32;
        this.targetTemp = 205;
        this.isScanning = false;
        this.macAddress = macAddress.toLowerCase();
        noble_1.default.on('scanStart', this.onScanStart);
        noble_1.default.on('scanStop', this.onScanStop);
        noble_1.default.on('warning', this.onWarning);
        noble_1.default.on('stateChange', this.onStateChange);
        noble_1.default.on('discover', this.onDiscover);
    }
}
exports.default = Kettle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V0dGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tldHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFzRTtBQUN0RSx1Q0FBd0Q7QUFDeEQsaUNBQW1DO0FBRW5DLE1BQXFCLE1BQU07SUFVekIsWUFBWSxVQUFrQjtRQWM5Qjs7V0FFRztRQUVILGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBRyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7UUFDekIsQ0FBQyxDQUFBO1FBRUQsY0FBUyxHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUE7UUFFRCxrQkFBYSxHQUFHLEtBQUssRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUN0QyxJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7Z0JBQ3pCLE1BQU0sZUFBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUMxQztRQUNILENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBRyxLQUFLLEVBQUUsVUFBc0IsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqRSxNQUFNLGVBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO2dCQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtnQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FB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