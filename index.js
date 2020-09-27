require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const noble = require('@abandonware/noble')

const PORT = process.env.PORT || 8080
const MAC = process.env.MAC_ADDRESS || ''
let initializeConnection
let kettlePeripheral
let kettleCharacterist
let isConnected = false
let isScanning = false
let isPoweredOn = false
let tempStep = 0

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

const numberToHex = (n) => {
  const hexString = n.toString(16)
  return hexString.length === 1 ? `0${hexString}` : hexString
}

/**
 * Kettle Commands
 */

const AUTHENTICATE = Buffer.from(
  'efdd0b3031323334353637383930313233349a6d',
  'hex',
)
const ON = Buffer.from('efdd0a0000010100', 'hex')

const OFF = Buffer.from('efdd0a0400000400', 'hex')

const TEMP = (step, temp) => {
  const s = numberToHex(step)
  const t = numberToHex(temp)
  const w = numberToHex(step + temp).slice(-2)
  const string = `efdd0a${s}01${t}${numberToHex(w)}01`
  return Buffer.from(string, 'hex')
}

;(async () => {
  try {
    noble.on('scanStart', () => {
      console.log('Scanning: TRUE')
      isScanning = true
    })
    noble.on('scanStop', () => {
      console.log('Scanning: FALSE')
      isScanning = false
    })
    noble.on('warning', (warn) => {
      console.log('Warning:')
      console.log(warn)
    })

    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        await noble.startScanningAsync([], false)
      }
    })

    noble.on('discover', async (peripheral) => {
      if ([peripheral.id, peripheral.address].includes(MAC.toLowerCase())) {
        await noble.stopScanningAsync()
        kettlePeripheral = peripheral
        kettlePeripheral.on('connect', (err) => {
          console.log('Kettle: Connected')
          if (err) console.log(err)
          isConnected = true
        })
        kettlePeripheral.on('disconnect', (err) => {
          console.log('Kettle: Disonnected')
          if (err) throw err
          isConnected = false
          isPoweredOn = false
          tempStep = 0
        })

        initializeConnection = async () => {
          await kettlePeripheral.connectAsync()
          const discovered = await kettlePeripheral.discoverSomeServicesAndCharacteristicsAsync(
            ['1820'],
            ['2a80'],
          )

          kettleCharacterist = discovered.characteristics[0]
          kettleCharacterist.on('data', (data) => {
            const hex = data.toString('hex')
            console.log(`Received: "${hex}"`)
          })

          // subscribe to be notified whenever the peripheral update the characteristic
          // await kettleCharacterist.subscribeAsync()
          await kettleCharacterist.writeAsync(AUTHENTICATE, true)
        }

        await initializeConnection()
      }
    })

    /**
     * Express Server
     */

    const app = express()
    app.use(bodyParser.json())

    const wakeupScanner = asyncHandler(async (req, res, next) => {
      if (!isConnected) {
        await initializeConnection()
      }
      return next()
    })

    const sendStatus = asyncHandler(async (_, res) => {
      res.json({ isConnected, isScanning, isPoweredOn })
    })

    app.get(
      '/api/status',
      wakeupScanner,
      asyncHandler(async (_req, _res, next) => {
        const data = await kettleCharacterist.readAsync()
        console.log(data.toString('hex'))
        isPoweredOn = true
        next()
      }),
      sendStatus,
    )
    app.post(
      '/api/power',
      wakeupScanner,
      asyncHandler(async (req, res, next) => {
        const { targetState } = req.body
        console.log(targetState)
        //await kettleCharacterist.writeAsync(ON, true)
        //isPoweredOn = true
        next()
      }),
      sendStatus,
    )
    app.get(
      '/api/power/on',
      wakeupScanner,
      asyncHandler(async (_req, _res, next) => {
        await kettleCharacterist.writeAsync(ON, true)
        isPoweredOn = true
        tempStep = 0
        next()
      }),
      sendStatus,
    )

    app.get(
      '/api/power/off',
      wakeupScanner,
      asyncHandler(async (_req, _res, next) => {
        await kettleCharacterist.writeAsync(OFF, true)
        isPoweredOn = false
        tempStep = 0
        next()
      }),
      sendStatus,
    )
    app.get(
      '/api/temp/:deg',
      wakeupScanner,
      asyncHandler(async (req, res, next) => {
        const temperature = parseInt(req.params.deg, 10)
        if (temperature > 212) {
          return res
            .status(422)
            .json({ error: 'Temperature must be at or below 212' })
        }
        if (temperature < 104) {
          return res
            .status(422)
            .json({ error: 'Temperature must at or above 104' })
        }

        tempStep++
        const buff = TEMP(tempStep, temperature)
        await kettleCharacterist.writeAsync(buff, true)
        next()
      }),
      sendStatus,
    )

    app.listen(PORT, () => console.log(`server listening on ${PORT}`))
  } catch (err) {
    console.log(err)
  }
})()
