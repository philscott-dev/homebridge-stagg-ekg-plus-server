import fetcher, { Method } from './api'
import { ScheduleResponse } from './schedule'

export type KettleResponse = {
  id: number
  isConnected: boolean
  name: string
  macAddress: string
  createdDate: string
  updatedDate: string
  schedule: ScheduleResponse[]
}

export const listKettles = (endpoint: string) => fetcher(Method.GET, endpoint)
export const getKettle = (endpoint: string) => fetcher(Method.GET, endpoint)
