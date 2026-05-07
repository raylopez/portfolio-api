import type { NextFunction, Request, Response } from 'express'


export type EndPointAsync = (req: Request, res: Response) => Promise<void>
export type EndPointWithIdAsync = (req: Request<{id: string}>, res: Response) => Promise<void>
export type EndPointCreateAsync<T extends Record<string, any>> = (req: Request<{},{}, T>, res: Response) => Promise<void>
export type EndPointUpdateAsync<T extends Record<string, any>> = (req: Request<{id: string},{}, T>, res: Response) => Promise<void>

export type MiddlewareAsync =  (req: Request, res: Response, next: NextFunction) => Promise<void> | void