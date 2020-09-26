import { ScheduleEntity } from 'server/entity'
import {
  AbstractRepository,
  DeleteResult,
  EntityRepository,
  getCustomRepository,
} from 'typeorm'
import { ScheduleRepository } from '.'
import KettleEntity from '../entity/KettleEntity'

@EntityRepository(KettleEntity)
export default class KettleRepository extends AbstractRepository<KettleEntity> {
  async create({
    macAddress,
    name,
  }: {
    macAddress: string
    name: string
  }): Promise<KettleEntity> {
    const kettle = new KettleEntity()
    kettle.macAddress = macAddress
    kettle.name = name
    kettle.schedule = []
    return this.repository.save(kettle)
  }

  async find(): Promise<KettleEntity[]> {
    return this.repository.find({ relations: ['schedule'] })
  }

  async findById(id: string): Promise<KettleEntity | undefined> {
    return this.repository.findOne(id, { relations: ['schedule'] })
  }

  async update(id: string): Promise<KettleEntity | undefined> {
    const kettle = await this.findById(id)
    if (!kettle) return
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(KettleEntity)
      .where('id = :id', { id })
      .execute()
  }

  async addSchedule(
    id: string,
    schedule: ScheduleEntity,
  ): Promise<KettleEntity | undefined> {
    const kettle = await this.findById(id)
    if (kettle) {
      kettle.schedule.push(schedule)
      return this.repository.save(kettle)
    }
  }
}
