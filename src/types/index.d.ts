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


import { Theme } from '@emotion/react'

export namespace Size {
  export type xxsmall = 'xxsmall'
  export type xsmall = 'xsmall'
  export type small = 'small'
  export type medium = 'medium'
  export type large = 'large'
  export type xlarge = 'xlarge'
  export type xxlarge = 'xxlarge'
}

export namespace Variant { 
  export type primary = 'primary'
  export type secondary = 'secondary'
  export type tertiary = 'tertiary' 
  export type light = 'light' 
  export type dark = 'dark'
}

export namespace Weight {
  export type normal = 'normal'
  export type emphasized = 'emphasized'
  export type superEmphasized = 'superEmphasized' 
  export type deemphasized = 'deemphasized' 
  export type light = 'light'
}

export type Styles<K> = Record<K, SerializedStyles> 

