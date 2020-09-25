import { Unit } from '../../enums'
import { AbstractRepository, EntityRepository } from 'typeorm'
import SettingsEntity from '../entity/SettingsEntity'

@EntityRepository(SettingsEntity)
export default class SettingsRepository extends AbstractRepository<
  SettingsEntity
> {
  async findOrCreate(): Promise<SettingsEntity | undefined> {
    const settings = await this.repository.findOne()
    if (settings) {
      return settings
    }

    const entity = new SettingsEntity()
    entity.unit = Unit.Fahrenheit
    return this.repository.save(entity)
  }

  async update(unit: Unit): Promise<SettingsEntity | undefined> {
    const settings = await this.repository.findOne()
    if (settings) {
      settings.unit = unit
      return this.repository.save(settings)
    }
  }
}
