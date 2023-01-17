import { SaveOptions } from 'typeorm'
import { startApp, stopApp } from '../app'
import { createDataSource } from '../models'
import { Base } from '../models/entities/Base'
import { Bot } from '../models/entities/Bot'
import { Command } from '../models/entities/Command'
import { Point } from '../models/entities/Point'
import { Resource } from '../models/entities/Resource'
import { User } from '../models/entities/User'
import { repositories } from '../models/repositories'
import { Table } from '../utils/types'
import { usersUtils } from './utils/users'

const dataSource = createDataSource()

function ensureStringIsTable(str: string): str is Table {
    return str in Table
}

beforeAll(async () => {
    await startApp()
    await dataSource.initialize()

    for (const key in repositories) {
        if (ensureStringIsTable(key)) {
            jest.spyOn(repositories[key], 'save').mockImplementation(
                async (entity: any, options?: SaveOptions | undefined) => {
                    const result = await dataSource.getRepository(getEntityByTable(key)).save(entity, options)

                    if (result.id) {
                        usersUtils.idsToCleanupAfterAll[key].push(result.id)
                    }

                    return result
                }
            )
        }
    }
})

function getEntityByTable(table: Table) {
    switch (table) {
        case Table.USERS:
            return User
        case Table.RESOURCES:
            return Resource
        case Table.BASES:
            return Base
        case Table.BOTS:
            return Bot
        case Table.POINTS:
            return Point
        case Table.COMMANDS:
            return Command
    }
}

afterAll(async () => {
    // Clean up created entities from DB after all
    let key: Table
    for (key in usersUtils.idsToCleanupAfterAll) {
        if (usersUtils.idsToCleanupAfterAll[key].length) {
            const query = dataSource.createQueryBuilder().delete().from(key)
            usersUtils.idsToCleanupAfterAll[key].forEach((id) => query.where('id = :id', { id }))
            await query.execute()
        }
    }
    await stopApp()
})
