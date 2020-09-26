import bunyan from 'bunyan'

export const logger = bunyan.createLogger({
  name: 'homebridge-stagg-ekg-plus',
  stream: process.stdout,
  level: 'info',
})
