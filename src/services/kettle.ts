import fetcher, { Method } from './api'

export const fetchKettle = (endpoint: string, id: string) =>
  fetcher(Method.GET, endpoint + '/' + id)
