import { AbstractRepository, EntityRepository } from 'typeorm'
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
    return this.repository.save(kettle)
  }

  async find(): Promise<KettleEntity[]> {
    return this.repository.find()
  }

  async findById(id: string): Promise<KettleEntity | undefined> {
    return this.repository.findOne(id)
  }

  async update(id: string): Promise<KettleEntity | undefined> {
    const kettle = this.repository.findOne(id)
    if (!kettle) return
  }
}
