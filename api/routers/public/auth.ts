import { FastifyInstance } from 'fastify'
import { authPublicControllers } from '../../controllers/public/auth'

export async function authPublicRouter(fastify: FastifyInstance) {
    fastify
        .post('/login', authPublicControllers.postLogin)
        .get('/refresh', authPublicControllers.postRefresh)
        .post('/logout', authPublicControllers.postLogout)
}
