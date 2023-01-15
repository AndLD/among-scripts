import { NextFunction } from '@fastify/middie'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { errors } from '../utils/constants'
import { IUserState } from '../utils/interfaces/user'
import { accessJwtSecret } from '../utils/jwt'

export async function isAuthorized(req: FastifyRequest, reply: FastifyReply, next: NextFunction) {
    if (!req.headers.authorization) {
        throw errors.AUTHORIZATION_HEADER_EMPTY
    }

    const token: string = req.headers.authorization.split(' ')[1] as string

    try {
        const decodeValue = jwt.verify(token, accessJwtSecret) as { user: IUserState }

        // TODO: Validate decodeValue ?

        req.requestContext.set('user', decodeValue.user)
    } catch (e) {
        throw errors.JWT_INVALID
    }

    next()
}

export function isSocketAllowed(req: any, fn: (err: string | null | undefined, success: boolean) => void) {
    if (!req.headers.authorization) {
        return fn(errors.AUTHORIZATION_HEADER_EMPTY.msg, false)
    }

    try {
        const token: string = req.headers.authorization?.split(' ')[1] as string

        var decodeValue = jwt.verify(token, accessJwtSecret) as { user: IUserState }
    } catch (e) {
        return fn(errors.JWT_INVALID.msg, false)
    }

    fn(null, !!decodeValue?.user.active)
}

export function isActive(req: FastifyRequest, reply: FastifyReply, next: NextFunction) {
    const active = req.requestContext.get('user')?.active

    if (active) {
        return next()
    }

    reply.status(403).send()
}

export function hasUserStatus(req: FastifyRequest, reply: FastifyReply, next: NextFunction) {
    const status = req.requestContext.get('user')?.status

    if (!status) {
        return reply.status(500).send()
    }

    if (status === 'admin' || status == 'user') {
        return next()
    }

    reply.status(403).send()
}

export function hasAdminStatus(req: FastifyRequest, reply: FastifyReply, next: NextFunction) {
    const status = req.requestContext.get('user')?.status

    if (!status) {
        return reply.status(500).send()
    }

    if (status === 'admin') {
        return next()
    }

    reply.status(403).send()
}
