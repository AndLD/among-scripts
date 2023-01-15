import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { dataSource } from '../../models'
import { User } from '../../models/entities/User'
import { emailService } from '../../services/email'
import { errors } from '../../utils/constants'
import { IUserPost, IUserPostBody, IUserState, UserStatus } from '../../utils/interfaces/user'
import { createEmailVerificationJwt, createJwt, emailVerificationJwtSecret } from '../../utils/jwt'
import bcrypt from 'bcrypt'

const userRepository = dataSource.getRepository(User).extend({
    activateUser(id: number) {
        return this.update(
            { id },
            {
                active: true
            }
        )
    }
})

async function postUser(req: FastifyRequest<{ Body: IUserPostBody }>, reply: FastifyReply) {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userObj: IUserPost = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        status: UserStatus.PLAYER,
        active: false
    }

    const user = await userRepository.save(userObj)

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

    if (!user.active) {
        emailService.sendEmailVerification(user.email, createEmailVerificationJwt(user.id))
    }

    reply.send({
        result: tokens.accessToken
    })
}

interface IGetVerifyEmailQuery {
    token: string
}

async function getVerifyEmail(req: FastifyRequest<{ Querystring: IGetVerifyEmailQuery }>, reply: FastifyReply) {
    const token = req.query.token

    if (!token) {
        throw errors.BAD_REQUEST
    }

    try {
        const decodeValue: any = jwt.verify(token, emailVerificationJwtSecret)

        // TODO: Validate decodeValue ?

        const userId = decodeValue.user.id

        const updatedUser = await userRepository.activateUser(userId)
        if (!updatedUser.raw) {
            throw errors.DOC_NOT_FOUND
        }

        reply.status(200).send()
    } catch (e) {
        throw errors.JWT_INVALID
    }
}

export const usersPublicControllers = {
    postUser,
    getVerifyEmail
}
