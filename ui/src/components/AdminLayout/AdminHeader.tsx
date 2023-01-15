import { Layout } from 'antd'
import UserDropdown from './AdminHeader/UserDropdown'
import AdminMenuTrigger from './AdminHeader/AdminMenuTrigger'

const { Header } = Layout

export default function AdminHeader() {
    return (
        <Header className="site-layout-background">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AdminMenuTrigger />
                <UserDropdown />
            </div>
        </Header>
    )
}
