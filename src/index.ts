import express, { NextFunction, Response, Request } from 'express'
import noble, { Characteristic, Peripheral } from '@abandonware/noble'
import { asyncHandler } from './middleware'
import { AUTHENTICATE, ON, OFF } from './commands'

const MAC = '00:1C:97:19:54:A2'.toLowerCase()
let initializeConnection: () => Promise<void>
let kettlePeripheral: Peripheral
let kettleCharacterist: Characteristic
let isConnected = false
let isScanning = false
let isPoweredOn = false

;(async () => {
  try {
    noble.on('scanStart', () => (isScanning = true))
    noble.on('scanStop', () => (isScanning = false))
    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        await noble.startScanningAsync([], false)
      }
    })

    noble.on('discover', async (peripheral) => {
      if ([peripheral.id, peripheral.address].includes(MAC)) {
        await noble.stopScanningAsync()
        kettlePeripheral = peripheral
        kettlePeripheral.on('connect', () => {
          console.log('Kettle: Connected')
          isConnected = true
        })
        kettlePeripheral.on('disconnect', () => {
          console.log('Kettle: Disonnected')
          isConnected = false
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
          await kettleCharacterist.subscribeAsync()
          await kettleCharacterist.writeAsync(AUTHENTICATE, true)
        }

        await initializeConnection()
      }
    })

    const app = express()

    const wakeupScanner = asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        if (!isConnected) {
          await initializeConnection()
        }
        return next()
      },
    )

    const sendStatus = asyncHandler(async (_, res) => {
      res.json({ isConnected, isScanning, isPoweredOn })
    })

    app.get('/api/status', wakeupScanner, sendStatus)
    app.get(
      '/api/power/on',
      wakeupScanner,
      asyncHandler(async (_req, _res, next) => {
        await kettleCharacterist.writeAsync(ON, true)
        isPoweredOn = true
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
        next()
      }),
      sendStatus,
    )
    app.post(
      '/api/temp',
      wakeupScanner,
      asyncHandler(async (_req, _res, next) => {
        next()
      }),
      sendStatus,
    )

    // app.get('/restart', async () => process.exit())

    app.listen(8080, () => console.log('server listening on 8080'))
  } catch (err) {
    console.log(err)
  }
})()
