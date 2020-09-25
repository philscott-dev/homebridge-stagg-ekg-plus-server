export const getHost = (): string => window?.location?.pathname ?? ''
export const getPort = (): string => window?.location?.port ?? ''
export const getProtocol = (): string => window?.location?.protocol ?? ''
export const getQuery = (): string => window?.location?.search ?? ''
export const getPath = (): string => window?.location?.pathname ?? ''
export const getPathParts = (): string[] =>
  getPath().split('-').join(' ').split('/')
