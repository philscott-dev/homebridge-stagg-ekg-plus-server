import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import ScheduleEntity from './ScheduleEntity'
import { Unit } from '../enums'

@Entity('kettle')
export default class KettleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  macAddress!: string

  @Column({ type: 'text', nullable: false })
  name!: string

  @Column({ type: 'text', default: Unit.Fahrenheit, nullable: false })
  unit!: Unit

  @Column({ type: 'integer', default: 205, nullable: false })
  temperature!: number

  @ManyToMany(() => ScheduleEntity)
  @JoinTable()
  schedules?: ScheduleEntity[]

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date
}
