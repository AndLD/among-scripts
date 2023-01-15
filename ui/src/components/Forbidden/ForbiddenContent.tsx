import { CustomerServiceOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useToken } from '../../hooks/auth'
import { IUserState } from '../../utils/interfaces/user'
import { parseUser } from '../../utils/jwt'

export default function ForbiddenContent() {
    const token = useToken()
    const [user, setUser] = useState<IUserState | null>(parseUser(token))

    useEffect(() => {
        setUser(parseUser(token))
    }, [token])

    if (!user) {
        return null
    }

    return user.active ? (
        <div className="forbidden-content">
            <div className="message">
                Your account <span style={{ color: 'red' }}>banned</span>
            </div>
            <div className="message">
                Contact admin to renew access <CustomerServiceOutlined style={{ fontSize: 50 }} />
            </div>
        </div>
    ) : (
        <div className="forbidden-content">
            <div className="message">Confirmation email was sent to {user.email}</div>
        </div>
    )
}
