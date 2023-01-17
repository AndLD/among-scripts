import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Base } from './entities/Base'
import { Bot } from './entities/Bot'
import { Command } from './entities/Command'
import { Point } from './entities/Point'
import { Resource } from './entities/Resource'
import { User } from './entities/User'

const port = process.env.POSTGRES_PORT

export const dataSource = createDataSource()

export function createDataSource() {
    return new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: port ? parseInt(port) : 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [User, Point, Resource, Base, Bot, Command]
    })
}
