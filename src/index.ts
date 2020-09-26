//import express from 'express'
import noble from '@abandonware/noble'
//import { asyncHandler } from './utils/asyncHandler'
import { AUTHENTICATE, ON } from './commands'

const peripheralAddress = '00:1C:97:19:54:A2'

;(async () => {
  try {
    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        await noble.startScanningAsync([], false)
      }
    })

    noble.on('discover', async (peripheral) => {
      if (
        [peripheral.id, peripheral.address].includes(
          peripheralAddress.toLowerCase(),
        )
      ) {
        await noble.stopScanningAsync()
        const { localName } = peripheral.advertisement
        console.log(
          `Peripheral ${localName} with ID ${peripheral.id} found. Connectable: ${peripheral.connectable}`,
        )

        await peripheral.connectAsync()
        const {
          characteristics,
        } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(
          ['1820'],
          ['2a80'],
        )

        const characteristic = characteristics[0]
        characteristic.on('data', (data) => {
          const hex = data.toString('hex')
          console.log(`Received: "${hex}"`)
        })

        console.log(AUTHENTICATE.toString())

        // subscribe to be notified whenever the peripheral update the characteristic
        await characteristic.subscribeAsync()
        await characteristic.writeAsync(AUTHENTICATE, true)
        //await characteristic.writeAsync(ON, true)
      }
    })

    // const app = express()

    // app.get(
    //   '/api/status',
    //   asyncHandler(async () => {}),
    // )

    // app.post(
    //   '/api/power',
    //   asyncHandler(async () => {}),
    // )
    // app.post(
    //   '/api/temp',
    //   asyncHandler(async () => {}),
    // )

    // app.get('/restart', async () => process.exit())

    //app.listen(8080, () => console.log('server listening on 8080'))
  } catch (err) {
    console.log(err)
  }
})()
