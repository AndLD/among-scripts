import bcrypt from 'bcrypt'
import { Response } from 'supertest'
import { repositories } from '../../models/repositories'
import { IUserPost, UserStatus } from '../../utils/interfaces/user'
import { Table } from '../../utils/types'
import { useState } from './hooks'
import { usersRequests } from './requests'
import { testRequest } from './test-request'
import { SetStateFunction, State } from './types'

const loginRoute = '/api/public/auth/login'

const [token, setToken] = useState<string>()
const idsToCleanupAfterAll: {
    [key in Table]: number[]
} = {
    users: [],
    resources: [],
    bases: [],
    bots: [],
    points: [],
    commands: []
}

async function signupTestUser(status?: UserStatus) {
    const email = _getRandomEmail()

    await _storeUser(email, status)

    await _loginUser(email, usersRequests.defaultBody.password)
}

async function _storeUser(email: string, status?: UserStatus) {
    const { username, password } = usersRequests.defaultBody
    const hashedPassword = await bcrypt.hash(password, 10)

    const user: IUserPost = {
        email,
        username,
        password: hashedPassword,
        status: status || UserStatus.PLAYER,
        active: true
    }

    await repositories.users.save(user)
}

async function _loginUser(email: string, password: string) {
    await testRequest(
        {
            method: 'POST',
            route: loginRoute,
            body: {
                email,
                password
            },
            resCode: 200,
            resBody: {
                result: expect.any(String)
            }
        },
        (res: Response) => {
            setToken(res.body.result)
        }
    )
}

function _getRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let string = ''
    for (var i = 0; i < 15; i++) {
        string += chars[Math.floor(Math.random() * chars.length)]
    }

    return string + '@test.com'
}

export const usersUtils = {
    signupTestUser,
    tokenState: [token, setToken] as [State, SetStateFunction<string>],
    idsToCleanupAfterAll
}
