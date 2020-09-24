type KettleType = {
  id: number
  macAddress: string
  name: string
  isScheduled: boolean
  timeOn?: Date
  timeOff?: Date
  unit: string
  temperature: number
  createdDate: Date
  updatedDate: Date
}
