import { Menu } from 'antd'
import {
    DashboardOutlined,
    TeamOutlined,
    BranchesOutlined,
    RocketOutlined,
    SettingOutlined,
    RobotOutlined
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'

export default function AdminMenu() {
    const isMenuCollapsed = useAppSelector((state) => state.adminReducer.isMenuCollapsed)

    const location = useLocation()

    const style = {
        fontSize: '25px',
        transform: isMenuCollapsed ? 'translateX(-25%)' : ''
    }

    return (
        <Menu style={{ fontSize: '15px' }} theme="dark" mode="inline" selectedKeys={[location.pathname || '/admin']}>
            <Menu.Item key="/admin" icon={<DashboardOutlined style={style} />}>
                <Link to={'/admin'}>Дашборд</Link>
            </Menu.Item>

            <Menu.Item key="/admin/settings" icon={<SettingOutlined style={style} />}>
                <Link to={'/admin/settings'}>Налаштування</Link>
            </Menu.Item>

            <Menu.Item key="/admin/users" icon={<TeamOutlined style={style} />}>
                <Link to={'/admin/users'}>Користувачі</Link>
            </Menu.Item>

            <Menu.Item key="/admin/constructor" icon={<BranchesOutlined style={style} />}>
                <Link to={'/admin/constructor'}>Конструктор</Link>
            </Menu.Item>

            <Menu.Item key="/admin/guide" icon={<RocketOutlined style={style} />}>
                <Link to={'/admin/guide'}>Довідник</Link>
            </Menu.Item>

            <Menu.Item key="/game" icon={<RobotOutlined style={style} />}>
                <Link to={'/game'}>Гра</Link>
            </Menu.Item>
        </Menu>
    )
}
