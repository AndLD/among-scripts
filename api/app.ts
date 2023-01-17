import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyMiddie from '@fastify/middie'
import fastifyRequestContext from '@fastify/request-context'
import { FastifyInstance } from 'fastify'
import fastifyIo from 'fastify-socket.io'
import 'reflect-metadata'
import { isSocketAllowed } from './middlewares/auth'
import { dataSource } from './models'
import { apiRouters } from './routers'
import { emailService } from './services/email'
import { FRONTEND_URL } from './utils/constants'

export async function setupApp(app: FastifyInstance) {
    app.register(fastifyHelmet)

    const whitelist = process.env.WHITELIST_URLS
    const corsOptions = {
        origin: function (origin: string, callback: any) {
            if (!origin || whitelist?.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
    app.register(fastifyCors, corsOptions)

    app.register(fastifyRequestContext, { hook: 'preValidation' })
    app.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET
    })
    app.register(fastifyMiddie)
    app.register(fastifyIo, {
        cors: {
            origin: FRONTEND_URL,
            credentials: true
        },
        allowRequest: isSocketAllowed
    })
    app.register(apiRouters, { prefix: '/api' })

    app.get('/', (req, reply) => {
        setTimeout(() => app.io.emit('hello'), 2000)
        reply.status(200).send()
    })

    app.setErrorHandler(function (error, request, reply) {
        this.log.error(error)
        reply.status(parseInt(error.code)).send({ msg: error.message, code: error.code })
    })

    await app.ready()

    app.io.on('connection', (socket) => {
        app.log.info(`Socket connected: ${socket.id}`)
    })

    await Promise.all([emailService.init(), dataSource.initialize()])

    app.listen({ host: '127.0.0.1', port: 8080 }, (err) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
    })

    return app
}
