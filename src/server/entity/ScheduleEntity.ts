import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { KettleEntity } from '.'

@Entity('schedule')
export default class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  name!: string

  @Column({ type: 'boolean', default: true, nullable: false })
  isEnabled!: boolean

  @Column({ type: 'integer', nullable: false })
  temperature!: number

  @Column({ type: 'text', nullable: false })
  timeOn!: string

  @Column({ type: 'text', nullable: false })
  timeOff!: string

  @ManyToOne((type) => KettleEntity, (kettle) => kettle.schedule, {
    cascade: true,
  })
  kettle: KettleEntity

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date
}
