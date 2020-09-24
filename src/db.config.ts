import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { KettleEntity, ScheduleEntity } from './entity'

const sqliteOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './ekg.sqlite',
  synchronize: true,
  logging: false,
  entities: [KettleEntity, ScheduleEntity],
}

export default sqliteOptions
