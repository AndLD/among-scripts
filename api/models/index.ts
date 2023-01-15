import { DataSource } from 'typeorm'
import { Base } from './entities/Base'
import { Bot } from './entities/Bot'
import { Command } from './entities/Command'
import { Point } from './entities/Point'
import { Resource } from './entities/Resource'
import { User } from './entities/User'

let _dataSource: DataSource | undefined

function createDataSource() {
    const port = process.env.PG_PORT

    _dataSource = new DataSource({
        type: 'postgres',
        host: process.env.PG_HOST || 'localhost',
        port: port ? parseInt(port) : 5432,
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [User, Point, Resource, Base, Bot, Command]
    })
}

export function getDataSource() {
    if (!_dataSource) {
        createDataSource()
    }

    return _dataSource as DataSource
}
