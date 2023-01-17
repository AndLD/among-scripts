import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import 'reflect-metadata'
import { startApp } from './app'

startApp()
