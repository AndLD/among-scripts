import { Form, FormInstance, Input } from 'antd'
import { useAppDispatch } from '../../hooks/store'
import { appSlice } from '../../store/app.reducer'
import { usePostUserMutation } from '../../store/users.api'
import { IUserPostBody } from '../../utils/interfaces/user'
import { errorNotification } from '../../utils/notifications'
import { validationRules } from '../../utils/validation'

interface ISignupForm {
    form: FormInstance<any>
}

export default function SignupForm({ form }: ISignupForm) {
    const dispatch = useAppDispatch()
    const [postUser] = usePostUserMutation()

    function onFinish(user: IUserPostBody) {
        postUser(user).then((value: any) => {
            if (value.data) {
                const token = value.data.result
                dispatch(appSlice.actions.setToken(token))
            } else {
                // TODO: Handle validation errors
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(value.error?.originalStatus === 503 ? 'Sign Up Unavailable' : error, 'Sign Up Error')
            }
        })
    }

    return (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" className="auth-form">
            <Form.Item
                name="username"
                rules={[
                    validationRules.REQUIRED('Please input username!'),
                    validationRules.USERNAME('Invalid username!')
                ]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[validationRules.EMAIL('Invalid email'), validationRules.REQUIRED('Please input email!')]}
            >
                <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    validationRules.REQUIRED('Please input password!'),
                    validationRules.PASSWORD(
                        'Password should have 6-20 symbols, at least 1 digit, camel case and default latin alphabet letter and special symbol: -#$.%&@(){}[]!?+*'
                    )
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
        </Form>
    )
}
