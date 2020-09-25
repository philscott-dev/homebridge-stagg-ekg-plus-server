import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { KettleEntity } from '.'
import { Schedule } from '../../enums'

@Entity('schedule')
export default class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  name!: string

  @Column({ type: 'boolean', default: Schedule.Disabled, nullable: false })
  status!: Schedule

  @Column({ type: 'integer', nullable: false })
  temperature!: number

  @Column({ type: 'text', nullable: true })
  timeOn?: Date

  @Column({ type: 'text', nullable: true })
  timeOff?: Date

  @ManyToOne((type) => KettleEntity, (kettle) => kettle.schedule)
  kettle: KettleEntity

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date
}
