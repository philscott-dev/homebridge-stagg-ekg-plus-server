require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import Kettle from './Kettle'
import { asyncHandler } from './middleware'

const PORT = process.env.PORT || 8080
const MAC = process.env.MAC_ADDRESS || ''

;(async () => {
  try {
    const kettle = new Kettle(MAC)

    const app = express()
    app.use(bodyParser.json())

    app.get(
      '/api/status',
      asyncHandler(async (_req, res) => {
        const status = kettle.getStatus()
        res.json(status)
      }),
    )
    app.post(
      '/api/power',
      asyncHandler(async (req, res) => {
        const { targetState } = req.body
        const powerState = parseInt(targetState, 10)
        await kettle.setPower(powerState)
        console.log({ powerState })
        res.json({ powerState })
      }),
    )
    app.post(
      '/api/temperature',
      asyncHandler(async (req, res) => {
        const { targetTemp } = req.body
        const temperature = parseInt(targetTemp, 10)
        await kettle.setTemp(temperature)
        console.log({ temperature })
        res.json({ temperature })
      }),
    )

    app.listen(PORT, () => console.log(`server listening on ${PORT}`))
  } catch (err) {
    console.log(err)
  }
})()
