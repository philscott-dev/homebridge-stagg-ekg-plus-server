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
import { Status, Unit } from '../../enums'
import ScheduleEntity from './ScheduleEntity'

@Entity('kettle')
export default class KettleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  macAddress!: string

  @Column({ type: 'text', nullable: false })
  name!: string

  // @ManyToOne((type) => SettingsEntity, (settings) => settings.unit)
  // unit!: Unit

  @OneToMany((type) => ScheduleEntity, (schedule) => schedule.kettle, {
    cascade: true,
  })
  schedule: ScheduleEntity[]

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date

  status!: Status
  @AfterLoad()
  async setStatus() {
    this.status = Status.Disconnected
  }
}
