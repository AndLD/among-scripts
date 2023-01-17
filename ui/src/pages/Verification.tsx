import { LoadingOutlined } from '@ant-design/icons'
import { useCallback, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useToken } from '../hooks/auth'
import { useRefreshToken } from '../hooks/store/auth.api'
import { useVerifyEmail } from '../hooks/store/users.api'
import '../styles/Verification.scss'

export default function Verification() {
    const [queryParams] = useSearchParams()
    const emailVerificationToken = queryParams.get('token')

    const [isLoading, setIsLoading] = useState(true)

    const token = useToken()
    const refreshToken = useRefreshToken(() => setIsLoading(false))

    const verifyEmailCallback = useCallback(() => {
        if (token) {
            alert('I am going to refresh token.')
            refreshToken()
        } else {
            setIsLoading(false)
        }
    }, [token])

    useVerifyEmail(emailVerificationToken, verifyEmailCallback)

    return (
        <div className="verification-container">
            {isLoading ? <LoadingOutlined /> : <Navigate replace to="/forbidden" />}
        </div>
    )
}
