import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyMiddie from '@fastify/middie'
import fastifyRequestContext from '@fastify/request-context'
import fastify from 'fastify'
import fastifyIo from 'fastify-socket.io'
import 'reflect-metadata'
import { isSocketAllowed } from './middlewares/auth'
import { dataSource } from './models'
import { repositories } from './models/repositories'
import { apiRouters } from './routers'
import { cronService } from './services/cron'
import { emailService } from './services/email'
import { FRONTEND_URL } from './utils/constants'

export const app = fastify({
    logger: true
})

export function startApp() {
    return new Promise<void>(async (resolve) => {
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
            reply.send()
        })

        app.setErrorHandler(function (error, request, reply) {
            this.log.error(error)
            reply
                .status(error.statusCode || 500)
                .send({ msg: error.message, code: error.statusCode || error.code || 500 })
        })

        await app.ready()

        app.io.on('connection', (socket) => {
            app.log.info(`Socket connected: ${socket.id}`)
        })

        await Promise.all([emailService.init(), dataSource.initialize()])
        await cronService.addJob(repositories.users.deleteInactiveUsers, 1)

        app.listen({ host: '127.0.0.1', port: 8080 }, (err) => {
            if (err) {
                app.log.error(err)
                process.exit(1)
            }

            resolve()
        })
    })
}

export async function stopApp() {
    cronService.stop()
    await app.close()
    if (dataSource.isInitialized) {
        await dataSource.destroy()
    }
}
