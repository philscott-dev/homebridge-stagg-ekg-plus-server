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
    /**
     * Noble Methods
     */
    onScanStart() {
        this.isScanning = true;
    }
    onScanStop() {
        this.isScanning = false;
    }
    onWarning(warning) {
        console.log(warning);
    }
    /**
     * Peripheral Methods
     */
    onConnect(err) {
        console.log('Kettle: Connected');
        if (err)
            console.log(err);
    }
    onDisconnect(err) {
        console.log('Kettle: Disonnected');
        if (err)
            throw err;
    }
    getStatus() {
        return {
            targetTemp: this.targetTemp,
            currentTemp: this.currentTemp,
            powerState: this.currentTemp === 32 ? enum_1.PowerState.Off : enum_1.PowerState.On,
        };
    }
    /**
     * Handle Data
     */
    onData(buff) {
        const hex = buff.toString('hex');
        this.cycle = hex === 'ffffffff' ? 0 : this.cycle + 1;
        if (this.cycle === 2) {
            this.currentTemp = hex_1.hexToNumber(hex);
        }
        else if (this.cycle === 4) {
            this.targetTemp = hex_1.hexToNumber(hex);
        }
    }
}
exports.default = Kettle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V0dGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tldHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFzRTtBQUN0RSx1Q0FBd0Q7QUFDeEQsaUNBQW1DO0FBRW5DLE1BQXFCLE1BQU07SUFVekIsWUFBWSxVQUFrQjtRQThCOUIsa0JBQWEsR0FBRyxLQUFLLEVBQUUsS0FBYSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO2dCQUN6QixNQUFNLGVBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDMUM7UUFDSCxDQUFDLENBQUE7UUFFRCxlQUFVLEdBQUcsS0FBSyxFQUFFLFVBQXNCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakUsTUFBTSxlQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBRW5ELE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLDJDQUEyQyxDQUNsRixDQUFDLE1BQU0sQ0FBQyxFQUNSLENBQUMsTUFBTSxDQUFDLENBQ1QsQ0FBQTtnQkFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENB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