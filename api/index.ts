import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyMiddie from '@fastify/middie'
import fastifyRequestContext from '@fastify/request-context'
import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifyIo from 'fastify-socket.io'
import 'reflect-metadata'
import { isSocketAuthorized } from './middlewares/auth'
import { apiRouters } from './routers'
import { emailService } from './services/email'
import { FRONTEND_URL } from './utils/constants'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export const app = fastify({
    logger: true
})

app.register(fastifyHelmet)

const whitelist = process.env.WHITELIST_URLS
const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true
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
    allowRequest: isSocketAuthorized
})
app.register(apiRouters, { prefix: '/api' })

app.get('/', (req, reply) => {
    setTimeout(() => app.io.emit('hello'), 2000)
    reply.status(200).send()
})

app.setErrorHandler(function (error, request, reply) {
    if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
        this.log.error(error)
        reply.status(parseInt(error.code)).send({ msg: error.message, code: error.code })
    } else {
        reply.send(error)
    }
})

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        app.log.info('Socket connected')
    })
})

app.listen({ host: '127.0.0.1', port: 8080 }, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }

    emailService.init()
})
