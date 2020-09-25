import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Unit } from '../../enums'

@Entity('settings')
export default class SettingsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', default: Unit.Fahrenheit, nullable: false })
  unit!: Unit
}
