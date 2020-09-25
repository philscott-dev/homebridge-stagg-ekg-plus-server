import fetcher, { Method } from './api'
import { Unit } from '../enums'

export type SettingsResponse = {
  id: number
  unit: Unit
}

export const getSettings = (endpoint: string) => fetcher(Method.GET, endpoint)
