import { dataSource } from '../models'
import { Table } from '../utils/types'
import { usersUtils } from './utils/users'

beforeAll(async () => {
    await startApp()

    jest.spyOn(dataSource, 'getDocumentId').mockImplementation((table) => {
        if (table) {
            usersUtils.idsToCleanupAfterAll[table].push(id)
        }
        return id
    })
})

afterAll(async () => {
    // Clean up created entities from DB after all
    let key: Table
    for (key in usersUtils.idsToCleanupAfterAll) {
        if (usersUtils.idsToCleanupAfterAll[key].length) {
            const query = dataSource.createQueryBuilder().delete().from(key)
            usersUtils.idsToCleanupAfterAll[key].forEach((id) => query.where('id = :id', id))
            await query.execute()
        }
    }

    await stopApp()
})
