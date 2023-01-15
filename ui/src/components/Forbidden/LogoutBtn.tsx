import { Button } from 'antd'
import { useLogout } from '../../hooks/store/auth.api'

export default function LogoutBtn() {
    const logout = useLogout()

    return (
        <Button type="primary" onClick={logout} size="large" style={{ fontSize: 20, lineHeight: 1 }}>
            Вийти
        </Button>
    )
}
