import { RouteObject } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import Dashboard from '../pages/Dashboard'
import Game from '../pages/Game'
import Users from '../pages/Users'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            }
        ]
    },
    {
        path: '/game',
        element: <Game />
    }
]

export default privateRoutes
