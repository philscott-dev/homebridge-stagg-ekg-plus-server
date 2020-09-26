import { AbstractRepository, EntityRepository, DeleteResult } from 'typeorm'
import ScheduleEntity from '../entity/ScheduleEntity'

type ScheduleType = {
  name: string
  timeOn: string
  timeOff: string
  days: string[]
  temperature: number
}

@EntityRepository(ScheduleEntity)
export default class ScheduleRepository extends AbstractRepository<
  ScheduleEntity
> {
  async create({
    name,
    timeOn,
    timeOff,
    days,
    temperature,
  }: ScheduleType): Promise<ScheduleEntity> {
    const schedule = new ScheduleEntity()
    schedule.name = name
    schedule.timeOn = timeOn
    schedule.timeOff = timeOff
    //schedule.days = days
    schedule.temperature = temperature
    return this.repository.save(schedule)
  }
  async findById(id: string): Promise<ScheduleEntity | undefined> {
    return this.repository.findOne(id)
  }

  async update(
    id: string,
    { name, timeOn, timeOff, days, temperature }: ScheduleType,
  ): Promise<ScheduleEntity | undefined> {
    const schedule = this.repository.findOne(id)
    if (schedule) {
      return schedule
    }
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(ScheduleEntity)
      .where('id = :id', { id })
      .execute()
  }
}
