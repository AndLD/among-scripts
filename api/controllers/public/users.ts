import bcrypt from 'bcrypt'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { dataSource } from '../../models'
import { Base } from '../../models/entities/Base'
import { Point } from '../../models/entities/Point'
import { User } from '../../models/entities/User'
import { emailService } from '../../services/email'
import { errors, INITIAL_BASE_STORAGE } from '../../utils/constants'
import { IUserPost, IUserPostBody, IUserState, UserStatus } from '../../utils/interfaces/user'
import { createEmailVerificationJwt, createJwt, emailVerificationJwtSecret } from '../../utils/jwt'

const userRepository = dataSource.getRepository(User).extend({
    activateUser(id: number) {
        return this.createQueryBuilder()
            .update(User, {
                active: true
            })
            .where('id = :id', { id })
            .returning('*')
            .updateEntity(true)
            .execute()
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

        const updatedUserResult = await userRepository.activateUser(userId)
        const updatedUser = updatedUserResult.raw[0]

        if (!updatedUser) {
            throw errors.DOC_NOT_FOUND
        }

        await dataSource.transaction(async (transactionalEntityManager) => {
            const base = new Base()

            base.storage = INITIAL_BASE_STORAGE
            base.userId = userId

            const savedBase = await transactionalEntityManager.save(base)

            const point = new Point()

            point.x = _.random(-1000, 1000)
            point.y = _.random(-1000, 1000)
            point.userId = userId
            point.baseId = savedBase.id

            await transactionalEntityManager.save(point)
        })

        reply.status(200).send()
    } catch (e) {
        throw errors.JWT_INVALID
    }
}

export const usersPublicControllers = {
    postUser,
    getVerifyEmail
}
