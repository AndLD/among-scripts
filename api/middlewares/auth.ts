import { FastifyReply } from 'fastify/types/reply'
import jwt from 'jsonwebtoken'
import { errors } from '../utils/constants'
import { accessJwtSecret } from '../utils/jwt'

export async function isAuthorized(req: any, res: FastifyReply, next: any) {
    if (!req.headers.authorization) {
        throw errors.AUTHORIZATION_HEADER_EMPTY
    }

    const token: string = req.headers.authorization.split(' ')[1] as string

    try {
        const decodeValue: any = jwt.verify(token, accessJwtSecret)

        // TODO: Validate decodeValue ?

        req.user = decodeValue.user
    } catch (e) {
        throw errors.JWT_INVALID
    }

    next()
}

export function isActive(req: any, reply: FastifyReply, next: any) {
    const active = req.user?.active

    if (active) {
        return next()
    }

    reply.status(403)
}

export function hasUserStatus(req: any, reply: FastifyReply, next: any) {
    const status = req.user?.status

    if (!status) {
        return reply.status(500)
    }

    if (status === 'admin' || status == 'user') {
        return next()
    }

    return reply.status(403)
}

export function hasAdminStatus(req: any, reply: FastifyReply, next: any) {
    const status = req.user?.status

    if (!status) {
        return reply.status(500)
    }

    if (status === 'admin') {
        return next()
    }

    return reply.status(403)
}
