import { ConfigInterface } from 'swr'

const swrConfig: ConfigInterface = {
  revalidateOnMount: true, // I always make sure this is true
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
}

export default swrConfig
