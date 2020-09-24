import type { Request, Response, NextFunction, RequestHandler } from 'express'
export declare const asyncHandler: (
  fn: RequestHandler,
) => (req: Request, res: Response, next: NextFunction) => void
