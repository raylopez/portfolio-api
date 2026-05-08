import { validateSchema } from '../models/schema.ts'
import type { MiddlewareAsync } from '../definitions/endpoints.ts'
import type { ZodObject } from 'zod'

export function validationMiddleware<T extends ZodObject>(schema: T): MiddlewareAsync {

    return (req, res, next) => {
        const isPartial: boolean = req.method === 'PATCH' ? true : false;
        const validation = validateSchema<T>(schema, req.body, isPartial)

        if (!validation.success) {
            res.status(400)
                .json({
                    message: 'Validation error',
                    error: JSON.parse(validation.error.message)
                })
            return
        }

        req.body = validation.data
        next()
    }
}