import bcrypt from 'bcrypt'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { getDataSource } from '../../models'
import { User } from '../../models/entities/User'
import { errors } from '../../utils/constants'
import { IAuthPostBody } from '../../utils/interfaces/auth'
import { IUserState } from '../../utils/interfaces/user'
import { createJwt, refreshJwtSecret } from '../../utils/jwt'

interface IRefreshJwtPayload extends jwt.JwtPayload {
    user: {
        id: number
    }
}

const userRepository = getDataSource().getRepository(User)

async function postLogin(req: FastifyRequest<{ Body: IAuthPostBody }>, reply: FastifyReply) {
    const body = req.body

    const user = await userRepository.findOneBy({
        email: body.email
    })

    if (!user) {
        throw errors.CREDENTIALS_INVALID
    }

    // Password check
    const isPasswordValid = await bcrypt.compare(body.password, user.password)

    if (!isPasswordValid) {
        throw errors.CREDENTIALS_INVALID
    }

    // JWT
    const userState: IUserState = {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
        active: user.active,
        timestamp: user.timestamp,
        lastUpdateTimestamp: user.lastUpdateTimestamp
    }

    const tokens = createJwt(userState)

    reply.setCookie('refresh_token', tokens.refreshToken, { httpOnly: true })
    reply.send({
        result: tokens.accessToken
    })
}

async function postRefresh(req: FastifyRequest, reply: FastifyReply) {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        throw errors.UNABLE_TO_REFRESH_ACCESS_JWT
    }

    // TODO: Investigate cases when jwt.verify can return a string ?
    try {
        var decodeValue: IRefreshJwtPayload = jwt.verify(refreshToken, refreshJwtSecret) as IRefreshJwtPayload
    } catch (e) {
        throw errors.UNABLE_TO_REFRESH_ACCESS_JWT
    }
    if (!decodeValue?.user) {
        throw new Error('decodeValue.user is empty!')
    }

    const userId = decodeValue.user.id

    const user = await userRepository.findOneBy({
        id: userId
    })

    if (!user) {
        throw errors.UNAUTHORIZED
    }

    const userState: IUserState = {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
        active: user.active,
        timestamp: user.timestamp,
        lastUpdateTimestamp: user.lastUpdateTimestamp
    }

    const tokens = createJwt(userState)

    reply.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
    reply.send({
        result: tokens.accessToken
    })
}

async function postLogout(req: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('refresh_token')
    reply.status(200).send()
}

export const authPublicControllers = {
    postLogin,
    postRefresh,
    postLogout
}
