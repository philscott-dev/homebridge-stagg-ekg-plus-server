import fetcher, { Method } from './api'
export type ScheduleResponse = {
  id: number
  name: string
  isEnabled: boolean
  temperature: number
  timeOn: Date
  timeOff: Date
  createdDate: Date
  updatedDate: Date
}

export const getSchedule = (endpoint: string) => fetcher(Method.GET, endpoint)
