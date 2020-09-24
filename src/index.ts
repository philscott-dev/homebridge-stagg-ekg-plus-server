import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { router } from './router'
import typeOrmOptions from './db.config'
;(async () => {
  try {
    const app = express()
    app.use(bodyParser.json())
    app.use(router)
    await createConnection(typeOrmOptions)
    app.listen(8080, () => console.log('server listening on 8080'))
  } catch (err) {
    console.log(err)
  }
})()
