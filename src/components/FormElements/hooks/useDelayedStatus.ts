import { useEffect, useState } from 'react'
import { LoadingStatus } from './useLoadingStatus'

export const LOADING_ANIMATION_THRESHOLD: number = 200
export const ANIMATION_SPEED: number = 700

let timer: ReturnType<typeof setTimeout>

export function useDelayedStatus(
  loadingStatus: LoadingStatus,
  loadingAnimationThreshold: number,
  animationSpeed: number,
  responseDelay: number,
) {
  const [delayedStatus, setStatusToDelay] = useState(LoadingStatus.Normal)

  useEffect(() => {
    if (loadingStatus !== delayedStatus) {
      // if Loading, dont animate Loading if theres a response before the threshold
      if (loadingStatus === LoadingStatus.Loading) {
        timer = setTimeout(() => {
          setStatusToDelay(loadingStatus)
        }, loadingAnimationThreshold)
      } else {
        clearTimeout(timer)
      }

      // if Normal, returning back to normal, but...
      if (loadingStatus === LoadingStatus.Normal) {
        // allow the error/success animation to happen then set normal
        setTimeout(() => {
          setStatusToDelay(loadingStatus)
        }, responseDelay || animationSpeed)
      }
      // pass along the next status
      else {
        setStatusToDelay(loadingStatus)
      }
    }
  }, [
    loadingStatus,
    delayedStatus,
    animationSpeed,
    loadingAnimationThreshold,
    responseDelay,
  ])

  return { delayedStatus }
}
