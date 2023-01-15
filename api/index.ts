import fastifyCookie from '@fastify/cookie'
import fastifyMiddie from '@fastify/middie'
import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifyIo from 'fastify-socket.io'
import 'reflect-metadata'
import { emailService } from './services/email'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export const app = fastify({
    logger: true
})

app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
})
app.register(fastifyMiddie)
app.register(fastifyIo)

app.setErrorHandler(function (error, request, reply) {
    if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
        this.log.error(error)
        reply.status(parseInt(error.code)).send({ ok: false })
    } else {
        reply.send(error)
    }
})

app.get('/', (req, reply) => {
    app.io.emit('hello')
})

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        app.log.info('Socket connected', socket.id)
    })
})

app.listen({ host: '127.0.0.1', port: 8080 }, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }

    emailService.init()
})
