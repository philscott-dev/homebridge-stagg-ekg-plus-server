import noble, { Peripheral, Characteristic } from '@abandonware/noble'
import { numberToHex, hexToNumber } from './helpers/hex'

export default class Kettle {
  private step: number
  private currentTemp: number
  private targetTemp: number
  private isScanning: boolean
  private macAddress: string
  private peripheral: Peripheral
  private characteristic: Characteristic

  constructor(macAddress) {
    this.step = 0
    this.currentTemp = 32
    this.targetTemp = 205
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

  onWarning(warning) {
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

  authenticate() {
    const buff = Buffer.from('efdd0b3031323334353637383930313233349a6d', 'hex')
    this.characteristic.writeAsync(buff, true)
  }

  setPowerOn() {
    this.step = 0
    const buff = Buffer.from('efdd0a0000010100', 'hex')
    this.characteristic.writeAsync(buff, true)
  }

  setPowerOff() {
    const buff = Buffer.from('efdd0a0400000400', 'hex')
    this.characteristic.writeAsync(buff, true)
  }

  setTemp(temp: number) {
    this.step = this.step + 1
    const s = numberToHex(this.step)
    const t = numberToHex(temp)
    const w = numberToHex(this.step + temp).slice(-2)
    const string = `efdd0a${s}01${t}${w}01`
    const buff = Buffer.from(string, 'hex')
    this.characteristic.writeAsync(buff, true)
  }

  /**
   * Handle Data
   */

  onData(buff: Buffer) {
    const hex = buff.toString('hex')
    console.log(`Received: "${hex}"`)
    console.log(hexToNumber(hex))
  }
}
