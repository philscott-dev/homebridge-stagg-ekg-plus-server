import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterLoad,
  OneToMany,
} from 'typeorm'
import { SettingsEntity } from '.'
import ScheduleEntity from './ScheduleEntity'

@Entity('kettle')
export default class KettleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  macAddress!: string

  @Column({ type: 'text', nullable: false })
  name!: string

  @OneToMany((type) => ScheduleEntity, (schedule) => schedule.kettle)
  schedule: ScheduleEntity[]

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date

  isConnected!: boolean
  @AfterLoad()
  async setStatus() {
    this.isConnected = false
  }
}
