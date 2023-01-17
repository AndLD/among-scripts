import { FastifyInstance } from 'fastify'
import { usersPublicControllers } from '../../controllers/public/users'

const postUserBodySchema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
        username: { type: 'string', pattern: '([a-zA-Z0-9]{1,20})+$' },
        email: {
            type: 'string',
            pattern:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.toString()
        },
        password: {
            type: 'string',
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&@(){}[\]!?+*])(?=.*[a-zA-Z]).{6,20}$/.toString()
        }
    }
}

export async function usersPublicRouter(fastify: FastifyInstance) {
    fastify.post('/', { schema: { body: postUserBodySchema } }, usersPublicControllers.postUser)
    fastify.get('/verify', usersPublicControllers.getVerifyEmail)
}
