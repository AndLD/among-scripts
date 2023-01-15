import { FastifyInstance } from 'fastify'
import { authPrivateRouter } from './auth'

export async function privateRouters(fastify: FastifyInstance) {
    fastify.register(authPrivateRouter, { prefix: '/auth' })
}
