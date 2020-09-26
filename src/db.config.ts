import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { KettleEntity, ScheduleEntity, SettingsEntity } from './entity'

const sqliteOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './ekg.sqlite',
  synchronize: true,
  logging: false,
  entities: [KettleEntity, ScheduleEntity, SettingsEntity],
}

export default sqliteOptions
