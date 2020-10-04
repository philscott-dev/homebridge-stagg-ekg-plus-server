import noble, { Peripheral, Characteristic } from '@abandonware/noble'
import { numberToHex, hexToNumber } from './helpers/hex'
import { PowerState } from './enum'

export default class Kettle {
  private step: number
  private cycle: number
  private currentTemp: number
  private targetTemp: number
  private isScanning: boolean
  private macAddress: string
  private peripheral?: Peripheral
  private characteristic?: Characteristic

  constructor(macAddress: string) {
    this.step = 0
    this.cycle = 0
    this.currentTemp = 32
    this.targetTemp = 205
    this.isScanning = false
    this.macAddress = macAddress.toLowerCase()
    noble.on('scanStart', this.onScanStart)
    noble.on('scanStop', this.onScanStop)
    noble.on('warning', this.onWarning)
    noble.on('stateChange', this.onStateChange)
    noble.on('discover', this.onDiscover)
  }

  /**
   * Noble Methods
   */

  onScanStart() {
    this.isScanning = true
  }

  onScanStop() {
    this.isScanning = false
  }

  onWarning(warning: any) {
    console.log(warning)
  }

  onStateChange = async (state: string) => {
    if (state === 'poweredOn') {
      await noble.startScanningAsync([], false)
    }
  }

  onDiscover = async (peripheral: Peripheral) => {
    if ([peripheral.id, peripheral.address].includes(this.macAddress)) {
      await noble.stopScanningAsync()
      this.peripheral = peripheral
      this.peripheral.on('connect', this.onConnect)
      this.peripheral.on('disconnect', this.onDisconnect)

      await this.peripheral.connectAsync()
      const discovered = await this.peripheral.discoverSomeServicesAndCharacteristicsAsync(
        ['1820'],
        ['2a80'],
      )
      this.characteristic = discovered.characteristics[0]
      this.characteristic.on('data', this.onData)
      await this.characteristic.subscribeAsync()
      await this.characteristic.writeAsync(
        Buffer.from('efdd0b3031323334353637383930313233349a6d', 'hex'),
        true,
      )
    }
  }

  /**
   * Peripheral Methods
   */

  onConnect(err: string) {
    console.log('Kettle: Connected')
    if (err) console.log(err)
  }

  onDisconnect(err: string) {
    console.log('Kettle: Disonnected')
    if (err) throw err
  }

  /**
   * Characteristic Methods
   */

  authenticate = async () => {
    const buff = Buffer.from('efdd0b3031323334353637383930313233349a6d', 'hex')
    await this.characteristic?.writeAsync(buff, true)
  }

  setPower = async (targetState: number) => {
    this.step = 0
    const on = Buffer.from('efdd0a0000010100', 'hex')
    const off = Buffer.from('efdd0a0400000400', 'hex')
    const buff = targetState === PowerState.On ? on : off
    await this.characteristic?.writeAsync(buff, true)
  }

  setTemp = async (temp: number) => {
    this.step = this.step + 1
    const s = numberToHex(this.step)
    const t = numberToHex(temp)
    const w = numberToHex(this.step + temp).slice(-2)
    const string = `efdd0a${s}01${t}${w}01`
    const buff = Buffer.from(string, 'hex')
    await this.characteristic?.writeAsync(buff, true)
  }

  getStatus() {
    console.log(this.targetTemp, this.currentTemp)
    return {
      targetTemp: this.targetTemp,
      currentTemp: this.currentTemp,
      powerState: this.currentTemp === 32 ? PowerState.Off : PowerState.On,
    }
  }

  /**
   * Handle Data
   */

  onData(buff: Buffer) {
    const hex = buff.toString('hex')
    this.cycle = hex === 'ffffffff' ? 0 : this.cycle + 1
    if (this.cycle === 2) {
      this.currentTemp = hexToNumber(hex)
      console.log(`Current Temp: ${this.currentTemp}`)
    } else if (this.cycle === 4) {
      this.targetTemp = hexToNumber(hex)
    }
  }
}
