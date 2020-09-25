import { useEffect, useState } from 'react'

export enum LoadingStatus {
  Normal = 0,
  Loading = 1,
  Success = 2,
  Error = 3,
}

type StatusError = string | Error | undefined

export default function useLoadingStatus(
  loading: boolean,
  error: StatusError,
  threshold: number = 500,
) {
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Normal)
  const [shouldShowLoading, setShouldShowLoading] = useState(false)
  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.Normal:
        if (loading) {
          setLoadingStatus(LoadingStatus.Loading)
        }
        break
      case LoadingStatus.Loading:
        if (!loading && !error) {
          setLoadingStatus(LoadingStatus.Success)
        }
        if (!loading && error) {
          setLoadingStatus(LoadingStatus.Error)
        }
        break
      case LoadingStatus.Success:
        setLoadingStatus(LoadingStatus.Normal)
        break
      case LoadingStatus.Error:
        setLoadingStatus(LoadingStatus.Normal)
        break
    }

    const timer = setTimeout(() => {
      setShouldShowLoading(true)
    }, threshold)

    if (loadingStatus !== LoadingStatus.Loading) {
      clearTimeout(timer)
      setShouldShowLoading(false)
    }
    return () => clearTimeout(timer)
  }, [error, loading, loadingStatus, threshold])
  return { loadingStatus, shouldShowLoading }
}
