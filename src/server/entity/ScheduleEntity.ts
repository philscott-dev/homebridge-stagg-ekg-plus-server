import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Schedule } from '../enums'

@Entity('schedule')
export default class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  name!: string

  @Column({ type: 'boolean', default: Schedule.Off, nullable: false })
  status!: Schedule

  @Column({ type: 'text', nullable: true })
  timeOn?: Date

  @Column({ type: 'text', nullable: true })
  timeOff?: Date

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date
}
