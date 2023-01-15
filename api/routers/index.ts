import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { privateRouters } from './private'
import { publicRouters } from './public'

export async function apiRouters(fastify: FastifyInstance, _: FastifyPluginOptions) {
    fastify.register(publicRouters, { prefix: '/public' })
    fastify.register(privateRouters, { prefix: '/private' })
}
