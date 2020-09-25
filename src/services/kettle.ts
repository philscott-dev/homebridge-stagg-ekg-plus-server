import fetcher, { Method } from './api'
import { Status } from '../enums'

export type KettleResponse = {
  id: number
  status: Status
  name: string
  macAddress: string
  createdDate: string
  updatedDate: string
}

export const listKettles = (endpoint: string) => fetcher(Method.GET, endpoint)
export const getKettle = (endpoint: string) => fetcher(Method.GET, endpoint)
