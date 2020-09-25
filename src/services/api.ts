import fetch from 'isomorphic-unfetch'
import querystring from 'querystring'

/**
 * Base Fetcher
 */

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const baseUrl = '/api'

export default async function fetcher(
  method: Method,
  endpoint: string,
  query?: { [key: string]: any },
  body?: { [key: string]: any },
) {
  console.log(body)
  try {
    // stringify query and call api
    const params = querystring.stringify(query)
    const res = await fetch(baseUrl + endpoint + '?' + params, {
      method,
      // do this stuff if you need to
      //body: body ? JSON.stringify(body) : null,
      //mode: 'cors',
      //cache: 'default',
      //credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })

    // check for errors
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    // await json
    const json = await res.json()
    return json
  } catch (err) {
    // catch errors
    console.log(err.statusCode)
    throw new Error(err)
  }
}

/**
 * Services
 */

export const fetchEvents = (
  endpoint: string,
  date: string,
  interval: string,
  layout: string,
) => fetcher(Method.GET, endpoint, { date, interval, layout })

// Interface for the useSWR hook data obj
export interface EventsResponse {
  createdAt: string
  deleted: boolean
  source: string
  text: string
  type: string
  updatedAt: string
  used: boolean
  user: string
  __v: number
  _id: string
}

export const createEvent = (endpoint: string) =>
  fetcher(Method.POST, endpoint, {})
