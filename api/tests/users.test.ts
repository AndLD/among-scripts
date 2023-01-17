import jwt from 'jsonwebtoken'
import { Response } from 'supertest'
import { errors } from '../utils/constants'
import { IAuthPostBody } from '../utils/interfaces/auth'
import { IUserPostBody, IUserState } from '../utils/interfaces/user'
import * as jwtUtilsModule from '../utils/jwt'
import { accessJwtSecret, refreshJwtExpiresIn, refreshJwtSecret } from '../utils/jwt'
import { useState } from './utils/hooks'
import { usersRequests } from './utils/requests'
import { testRequest } from './utils/test-request'

const usersPublicRoute = '/api/public/users'
// const usersPrivateRoute = '/api/private/user'
const authPublicRoute = '/api/public/auth'
const authPrivateRoute = '/api/private/auth'

const routes = {
    registration: usersPublicRoute,
    login: `${authPublicRoute}/login`,
    logout: `${authPublicRoute}/logout`,
    refresh: `${authPublicRoute}/refresh`,
    verifyToken: `${authPrivateRoute}/verify`
}

describe('Users Flow', () => {
    describe(`[POST ${usersPublicRoute}] Sign Up`, () => {
        const [token, setToken] = useState<string>()

        it('Should response 400, when email is invalid', async () => {
            const body: IUserPostBody = {
                ...usersRequests.defaultBody,
                email: '12345'
            }

            await testRequest(
                {
                    method: 'POST',
                    route: usersPublicRoute,
                    body,
                    resCode: 400
                },
                (res) => {
                    expect((res.body?.msg as string).startsWith('body/email must match pattern')).toBe(true)
                    expect(res.body?.code).toBe(400)
                }
            )
        })

        it('Should response 400, when username is invalid', async () => {
            const body: IUserPostBody = {
                ...usersRequests.defaultBody,
                username: '12345'
            }

            await testRequest(
                {
                    method: 'POST',
                    route: usersPublicRoute,
                    body,
                    resCode: 400
                },
                (res) => {
                    expect((res.body?.msg as string).startsWith('body/username must match pattern')).toBe(true)
                    expect(res.body?.code).toBe(400)
                }
            )
        })

        it('Should response 400, when password is invalid', async () => {
            const body: IUserPostBody = {
                ...usersRequests.defaultBody,
                password: '1'
            }

            await testRequest(
                {
                    method: 'POST',
                    route: usersPublicRoute,
                    body,
                    resCode: 400
                },
                (res) => {
                    expect((res.body?.msg as string).startsWith('body/password must match pattern')).toBe(true)
                    expect(res.body?.code).toBe(400)
                }
            )
        })

        it('Should response 200 with workable jwt, when body is valid', async () => {
            await usersRequests.defaultPost((res) => setToken(res.body.result))

            expect(token.state).toBeTruthy()

            // Make an authorized request to ensure jwt is valid
            await testRequest({
                method: 'GET',
                route: `${authPrivateRoute}/verify`,
                resCode: 200,
                auth: `Bearer ${token.state}`
            })
        })

        it('Should response 400, when user already registered', async () => {
            await testRequest({
                method: 'POST',
                route: usersPublicRoute,
                body: usersRequests.defaultBody,
                resCode: 400,
                resBody: errors.EMAIL_ALREADY_EXISTS
            })
        })
    })

    // describe(`[POST ${routes.logout}] Logout`, () => {
    //     it('Should response 200, when logout', async () => {
    //         await testRequest({
    //             method: 'POST',
    //             route: routes.logout,
    //             resCode: 200
    //         })
    //     })
    // })

    // describe(`[POST ${routes.login}] Login, [GET ${routes.refresh}] Refresh`, () => {
    //     const [token, setToken] = useState<string>()

    //     it('Should response 401, when user does not exist', async () => {
    //         const body: IAuthPostBody = {
    //             email: 'unexistent@email.com',
    //             password: usersRequests.defaultBody.password
    //         }

    //         await testRequest({
    //             method: 'POST',
    //             route: routes.login,
    //             body,
    //             resCode: 401,
    //             resBody: {
    //                 error: errors.CREDENTIALS_INVALID.msg
    //             }
    //         })
    //     })

    //     it('Should response 401, when password is invalid', async () => {
    //         const body: IAuthPostBody = {
    //             email: usersRequests.defaultBody.email,
    //             password: '2Qwerty'
    //         }

    //         await testRequest({
    //             method: 'POST',
    //             route: routes.login,
    //             body,
    //             resCode: 401,
    //             resBody: {
    //                 error: errors.CREDENTIALS_INVALID.msg
    //             }
    //         })
    //     })

    //     it('Should response 401, unable to refresh, when refresh jwt is empty', async () => {
    //         await testRequest({
    //             method: 'GET',
    //             route: routes.refresh,
    //             resCode: 401,
    //             resBody: {
    //                 error: errors.UNABLE_TO_REFRESH_ACCESS_JWT.msg
    //             }
    //         })
    //     })

    //     it('Should response 401, when access jwt is expired', async () => {
    //         jest.spyOn(jwtUtilsModule, 'createJwt').mockImplementationOnce((userState: IUserState) => {
    //             const accessToken = jwt.sign({ user: userState }, accessJwtSecret, {
    //                 expiresIn: '1ms'
    //             })
    //             const refreshToken = jwt.sign(
    //                 {
    //                     user: {
    //                         id: userState.id
    //                     }
    //                 },
    //                 refreshJwtSecret,
    //                 {
    //                     expiresIn: refreshJwtExpiresIn
    //                 }
    //             )

    //             return {
    //                 accessToken,
    //                 refreshToken
    //             }
    //         })

    //         await testRequest(
    //             {
    //                 method: 'POST',
    //                 route: routes.login,
    //                 body: {
    //                     email: usersRequests.defaultBody.email,
    //                     password: usersRequests.defaultBody.password
    //                 },
    //                 resCode: 200
    //             },
    //             (res: Response) => {
    //                 setToken(res.body.result)
    //             }
    //         )

    //         await testRequest({
    //             method: 'POST',
    //             route: routes.verifyToken,
    //             resCode: 401,
    //             resBody: {
    //                 error: errors.JWT_INVALID.msg
    //             },
    //             auth: `Bearer ${token.state}`
    //         })
    //     })

    //     it('Should response 200 with workable jwt, when refresh jwt is present', async () => {
    //         await testRequest(
    //             {
    //                 method: 'GET',
    //                 route: routes.refresh,
    //                 resCode: 200,
    //                 resBody: {
    //                     result: expect.any(String)
    //                 }
    //             },
    //             (res: Response) => setToken(res.body.result)
    //         )

    //         // Make an authorized request to ensure jwt is valid
    //         await testRequest({
    //             method: 'GET',
    //             route: `${authPrivateRoute}/verify`,
    //             resCode: 200,
    //             auth: `Bearer ${token.state}`
    //         })
    //     })
    // })
})
