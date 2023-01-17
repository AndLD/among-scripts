export const startTimestamp = Date.now()

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

export const environment = process.env.NODE_ENV || 'development'

export const rootUser = {
    name: 'Root',
    email: process.env.ROOT_USER_EMAIL || 'root@root.root',
    password: process.env.ROOT_USER_PASSWORD
}

export const errors = {
    BAD_HTTP_METHOD: { msg: 'Unexpected http request method', code: 405 },
    BAD_FILTERS: { msg: 'Invalid filters in query params', code: 400 },
    USER_HAS_NO_RIGHTS: {
        msg: 'User does not have enough permissions',
        code: 403
    },
    DOC_NOT_FOUND: { msg: 'The document does not exist', code: 404 },
    JWT_INVALID: { msg: 'JWT invalid', code: 401 },
    CREDENTIALS_INVALID: { msg: 'Email or password invalid', code: 401 },
    UNAUTHORIZED: { msg: 'Unauthorized', code: 401 },
    EMAIL_NOT_MATCHES_PATTERN: { msg: 'Email invalid', code: 400 },
    USERNAME_NOT_MATCHES_PATTERN: { msg: 'Username invalid', code: 400 },
    PASSWORD_NOT_MATCHES_PATTERN: { msg: 'Password invalid', code: 400 },
    EMAIL_ALREADY_EXISTS: { msg: 'Email already exists', code: 400 },
    UNABLE_TO_REFRESH_ACCESS_JWT: { msg: 'Unable to refresh access JWT', code: 401 },
    AUTHORIZATION_HEADER_EMPTY: { msg: 'Authorization header is empty', code: 401 },
    ENTITY_ALREADY_EXISTS: { msg: 'Entity already exists', code: 400 },
    ENTITY_USED: { msg: 'Entity already in use', code: 400 },
    FORBIDDEN: { msg: 'Forbidden', code: 403 },
    BAD_REQUEST: { msg: 'Bad request', code: 400 },
    INTERNAL_SERVER_ERROR: { msg: 'Internal server error', code: 500 },
    WRONG_ACTION: { msg: 'Wrong action', code: 403 },
    NOTIFICATIONS_SERVICE_DISABLED: { msg: 'Notifications service disabled', code: 503 },
    ARRAY_CONTAINS_NOT_UNIQUE: { msg: 'Array contains not unique', code: 400 }
}

export enum entities {
    USERS = 'users',
    MAPS = 'maps',
    POINTS = 'points',
    RESOURCES = 'resources',
    BASES = 'bases',
    BOTS = 'bots'
}

export const INITIAL_BASE_STORAGE = 300
