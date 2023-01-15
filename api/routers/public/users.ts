import { FastifyInstance } from 'fastify'
import { usersPublicControllers } from '../../controllers/public/users'

export function usersPublicRouter(fastify: FastifyInstance) {
    fastify.post('/', usersPublicControllers.postUser)
    fastify.get('/verify', usersPublicControllers.getVerifyEmail)
}
