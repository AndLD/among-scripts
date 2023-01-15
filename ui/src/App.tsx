import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { useAuth } from './hooks/auth'
import { useSocket } from './hooks/socket'

export default function App() {
    useAuth()
    useSocket()

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}
