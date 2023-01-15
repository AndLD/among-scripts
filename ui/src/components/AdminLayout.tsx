import { ArrowLeftOutlined } from '@ant-design/icons'
import { Layout, Typography } from 'antd'
import { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { layoutContext } from '../contexts'
import { useAppSelector } from '../hooks/store'
import '../styles/AdminLayout.scss'
import { VERSION } from '../utils/constants'
import AdminHeader from './AdminLayout/AdminHeader'
import AdminMenu from './AdminLayout/AdminMenu'

const { Sider, Content } = Layout

function AdminLayout() {
    const isMenuCollapsed = useAppSelector((state) => state.adminReducer.isMenuCollapsed)

    const {
        titleState: [title, setTitle],
        backPathState: [backPath, setBackPath]
    } = useContext(layoutContext)

    useEffect(() => {
        if (backPath) {
            setBackPath(null)
        }
    }, [window.location.pathname])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsed={isMenuCollapsed}>
                <div className="logo">
                    {/* <img src={logo} alt="Admin Page Logo" /> */}
                    <div
                        style={{
                            opacity: isMenuCollapsed ? 0 : 1,
                            transition: 'opacity ease 0.5s'
                        }}
                    >
                        {isMenuCollapsed ? null : 'Law Quest'}
                    </div>
                </div>
                <AdminMenu />
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bottom: 10,
                        color: 'white'
                    }}
                >
                    {VERSION}
                </div>
            </Sider>
            <Layout className="site-layout">
                <AdminHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        {backPath && (
                            <Link to={backPath}>
                                <ArrowLeftOutlined
                                    style={{ color: 'black', fontSize: 40, marginTop: 4, marginRight: 10 }}
                                />
                            </Link>
                        )}
                        <Typography.Title level={1}>{title}</Typography.Title>
                    </div>

                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
