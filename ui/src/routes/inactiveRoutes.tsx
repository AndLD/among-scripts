import Forbidden from '../pages/Forbidden'
import Verification from '../pages/Verification'

export const inactiveRoutes = [
    { path: '/verification', element: <Verification /> },
    { path: '/forbidden', element: <Forbidden /> }
]
