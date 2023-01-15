import { FastifyInstance } from 'fastify'
import { authPublicRouter } from './auth'
import { usersPublicRouter } from './users'

export async function publicRouters(fastify: FastifyInstance) {
    fastify.register(authPublicRouter, { prefix: '/auth' })
    fastify.register(usersPublicRouter, { prefix: '/users' })
}
