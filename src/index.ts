import express from 'express'
//import noble from '@abandonware/noble'
import { asyncHandler } from './utils/asyncHandler'
;(async () => {
  try {
    const app = express()

    app.get(
      '/api/status',
      asyncHandler(async () => {}),
    )

    app.post(
      '/api/power',
      asyncHandler(async () => {}),
    )
    app.post(
      '/api/temp',
      asyncHandler(async () => {}),
    )

    app.listen(8080, () => console.log('server listening on 8080'))
  } catch (err) {
    console.log(err)
  }
})()
