import { FastifyInstance } from 'fastify'
import { authPublicControllers } from '../../controllers/public/auth'

export function authPublicRouters(fastify: FastifyInstance) {
    fastify.post('/login', authPublicControllers.postLogin)
    fastify.post('/refresh', authPublicControllers.postRefresh)
    fastify.post('/logout', authPublicControllers.postLogout)
}
