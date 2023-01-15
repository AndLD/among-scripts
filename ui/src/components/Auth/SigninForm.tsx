import { Button, Form, Input } from 'antd'
import { useAppDispatch } from '../../hooks/store'
import { appSlice } from '../../store/app.reducer'
import { useLoginMutation } from '../../store/auth.api'
import { IAuthPostBody } from '../../utils/interfaces/auth'
import { errorNotification } from '../../utils/notifications'
import { validationRules } from '../../utils/validation'

interface ISigninForm {
    SignupBtn: () => JSX.Element
}

export default function SigninForm({ SignupBtn }: ISigninForm) {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [login] = useLoginMutation()

    function onFinish(user: IAuthPostBody) {
        login(user).then((value: any) => {
            if (value.data) {
                const token = value.data.result
                dispatch(appSlice.actions.setToken(token))
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Помилка входу в систему')
            }
        })
    }

    return (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" className="auth-form">
            <Form.Item name="email" rules={[validationRules.REQUIRED('Input your email'), validationRules.EMAIL()]}>
                <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[validationRules.REQUIRED('Input your password'), validationRules.PASSWORD()]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <div className="buttons-style">
                <Button className="button" htmlType="submit" type="primary">
                    Sign In
                </Button>
                <SignupBtn />
            </div>
        </Form>
    )
}
