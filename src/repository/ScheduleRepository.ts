import { AbstractRepository, EntityRepository } from 'typeorm'
import ScheduleEntity from '../entity/ScheduleEntity'

@EntityRepository(ScheduleEntity)
export default class ApplicationRepository extends AbstractRepository<
  ScheduleEntity
> {
  async create(): Promise<ScheduleEntity> {
    const schedule = new ScheduleEntity()
    return this.repository.save(schedule)
  }
  async findById(id: number): Promise<ScheduleEntity | undefined> {
    return this.repository.findOne(id)
  }

  async update(id: number): Promise<ScheduleEntity | undefined> {
    const schedule = this.repository.findOne(id)
    if (schedule) {
      return schedule
    }
  }
}
