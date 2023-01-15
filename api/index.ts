import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import fastify from 'fastify'
import 'reflect-metadata'
import { setupApp } from './app'

export const app = fastify({
    logger: true
})

setupApp(app)
