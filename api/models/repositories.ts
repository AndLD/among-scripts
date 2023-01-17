import { dataSource } from '.'
import { Base } from './entities/Base'
import { Bot } from './entities/Bot'
import { Command } from './entities/Command'
import { Point } from './entities/Point'
import { Resource } from './entities/Resource'
import { User } from './entities/User'

const users = dataSource.getRepository(User).extend({
    activateUser(id: number) {
        return users
            .createQueryBuilder()
            .update({
                active: true
            })
            .where('id = :id', { id })
            .returning('*')
            .updateEntity(true)
            .execute()
    },
    deleteInactiveUsers() {
        return users
            .createQueryBuilder()
            .delete()
            .where('active = :active', { active: false })
            .where('timestamp < :value', { value: new Date(Date.now() - 24 * 60 * 60 * 1000) })
            .execute()
    }
})
const resources = dataSource.getRepository(Resource)
const bases = dataSource.getRepository(Base)
const bots = dataSource.getRepository(Bot)
const points = dataSource.getRepository(Point)
const commands = dataSource.getRepository(Command)

export const repositories = {
    users,
    resources,
    bases,
    bots,
    points,
    commands
}
