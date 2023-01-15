import { useEffect, useState } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { layoutContext } from '../contexts'
import { useToken } from '../hooks/auth'
import useLayoutContext from '../hooks/pages/layout'
import Forbidden from '../pages/Forbidden'
import { inactiveRoutes } from '../routes/inactiveRoutes'
import privateRoutes from '../routes/private'
import publicRoutes from '../routes/public'
import { IUserState, UserStatus } from '../utils/interfaces/user'
import { parseUser } from '../utils/jwt'

export default function AppRoutes() {
    const token = useToken()

    const [routes, setRoutes] = useState<RouteObject[]>([])
    const [redirectRoute, setRedirectRoute] = useState<string | null>(null)

    useEffect(() => {
        const user: IUserState | null = parseUser(token)

        if (user && !user.active) {
            setRoutes(inactiveRoutes)
            setRedirectRoute('/forbidden')
            return
        }

        if (token) {
            switch (user?.status) {
                case UserStatus.ADMIN:
                    setRoutes(privateRoutes)
                    setRedirectRoute('/admin')
                    break
                case UserStatus.PLAYER:
                    setRoutes(privateRoutes.filter((route) => route.path === '/game'))
                    setRedirectRoute('/game')
                    break
                default:
                    setRoutes([{ path: '/forbidden', element: <Forbidden /> }])
                    setRedirectRoute('/forbidden')
                    break
            }
        } else {
            setRoutes(publicRoutes)
            setRedirectRoute('/auth')
        }
    }, [token])

    const routing = useRoutes(
        redirectRoute ? [...routes, { path: '*', element: <Navigate replace to={redirectRoute} /> }] : routes
    )

    return <layoutContext.Provider value={useLayoutContext()}>{routing}</layoutContext.Provider>
}
