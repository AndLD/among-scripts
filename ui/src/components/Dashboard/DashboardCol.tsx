import { Tooltip, Typography } from 'antd'

const { Title } = Typography

interface IDashboardColProps {
    title: string
    value: string | number
    icon: JSX.Element
}

export default function DashboardCol({ title, value, icon }: IDashboardColProps) {
    return (
        <div style={{ flex: 1 }}>
            <Tooltip title={title}>
                <Title level={2}>
                    <div>{value}</div>
                    <div style={{ fontSize: '60px', paddingTop: 10 }}>{icon}</div>
                </Title>
            </Tooltip>
        </div>
    )
}
