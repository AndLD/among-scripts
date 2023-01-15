import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { useAuth } from './hooks/auth'

export default function App() {
    useAuth()

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}
