import { Form, Modal } from 'antd'
import SignupForm from './SignupForm'

interface ISignupModal {
    isModalVisibleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function SignupModal({ isModalVisibleState }: ISignupModal) {
    const [isModalVisible, setIsModalVisible] = isModalVisibleState
    const [form] = Form.useForm()

    return (
        <Modal
            title="Sign Up"
            open={isModalVisible}
            okText="Створити аккаунт"
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={() => {
                setIsModalVisible(false)
                form.resetFields()
            }}
            onOk={() => form.submit()}
        >
            <SignupForm form={form} />
        </Modal>
    )
}
