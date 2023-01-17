import dotenv from 'dotenv'
import 'reflect-metadata'
import { startApp } from './app'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

startApp()
