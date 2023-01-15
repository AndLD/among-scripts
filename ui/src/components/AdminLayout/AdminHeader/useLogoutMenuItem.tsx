import { LogoutOutlined } from '@ant-design/icons'
import { useLogout } from '../../../hooks/store/auth.api'

export default function useLogoutMenuItem() {
    const logout = useLogout()

    return {
        key: 'logout',
        icon: <LogoutOutlined onClick={logout} style={{ marginRight: '4px', fontSize: '20px' }} />,
        label: (
            <div onClick={logout} style={{ fontSize: '17px' }}>
                Вихід
            </div>
        )
    }
}
