import { FastifyInstance } from 'fastify'
import { authPublicControllers } from '../../controllers/public/auth'

export async function authPublicRouter(fastify: FastifyInstance) {
    fastify.post('/login', authPublicControllers.postLogin)
    fastify.post('/refresh', authPublicControllers.postRefresh)
    fastify.post('/logout', authPublicControllers.postLogout)
}
