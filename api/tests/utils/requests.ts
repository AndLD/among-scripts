import { testRequest } from './test-request'

export const usersRequests = {
    route: '/api/public/users',

    defaultBody: {
        email: 'test@example.com',
        username: 'JestUser',
        password: '1Qwerty#'
    },

    defaultResBody: {
        result: expect.any(String)
    },

    // User registration
    defaultPost: function (callback?: (res: any) => void, options?: any) {
        return testRequest(
            {
                method: 'POST',
                route: this.route,
                body: this.defaultBody,
                resBody: this.defaultResBody,
                ...options
            },
            callback
        )
    }
}
