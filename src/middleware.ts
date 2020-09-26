import type { Request, Response, NextFunction, RequestHandler } from 'express'
export const asyncHandler = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise.resolve(fn(req, res, next)).catch(next)
