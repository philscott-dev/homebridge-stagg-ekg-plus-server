import 'reflect-metadata'
import express from 'express'
import next from 'next'
import { parse as parseUrl } from 'url'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { router } from './router'
import typeOrmOptions from './db.config'
import initialize from './initialize'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

;(async () => {
  try {
    const server = express()
    await app.prepare()
    await createConnection(typeOrmOptions)
    await initialize()
    server.use(bodyParser.json())
    server.use('/api', router)
    server.get('*', (req, res) => {
      const url = parseUrl(req.url, true)
      app.render(req, res, url.pathname || '', url.query)
    })
    server.listen(8080, () => console.log('server listening on 8080'))
  } catch (err) {
    console.log(err)
  }
})()
