import { Rule } from 'antd/lib/form'

interface IValidationRules {
    [key: string]: (message?: string) => Rule
}

export const validationRules: IValidationRules = {
    USERNAME: (message) => ({
        pattern: /([a-zA-Z0-9]{1,20})+$/,
        message: message || 'Invalid username'
    }),
    REQUIRED: (message) => ({
        required: true,
        message: message || 'Required'
    }),
    EMAIL: (message) => ({
        type: 'email',
        message: message || 'Invalid email'
    }),
    PASSWORD: (message) => ({
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&@(){}[\]!?+*])(?=.*[a-zA-Z]).{6,20}$/,
        message: message || 'Invalid пароль'
    })
}
