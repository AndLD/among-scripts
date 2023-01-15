import { FastifyInstance } from 'fastify'
import { authPrivateControllers } from '../../controllers/private/auth'

export async function authPrivateRouter(fastify: FastifyInstance) {
    fastify.get('/verify', authPrivateControllers.getVerify)
}
