"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToNumber = exports.numberToHex = void 0;
exports.numberToHex = (number) => {
    const hexString = number.toString(16);
    return hexString.length === 1 ? `0${hexString}` : hexString;
};
exports.hexToNumber = (hexString) => {
    const result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(`0x${hexString.substr(i, 2)}`);
    }
    return parseInt(result.join(' '), 16);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvaGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsV0FBVyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDNUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNyQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7QUFDN0QsQ0FBQyxDQUFBO0FBRVksUUFBQSxXQUFXLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUU7SUFDL0MsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFBO0lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUMzQztJQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUFBIn0=