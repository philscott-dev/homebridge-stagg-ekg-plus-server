import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from './repository'

export default async function initialize() {
  const repo = getCustomRepository(SettingsRepository)
  await repo.findOrCreate()
}
