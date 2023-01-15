interface IDashboardRowProps {
    children: JSX.Element[] | JSX.Element
}

export default function DashboardRow({ children }: IDashboardRowProps) {
    return <div style={{ display: 'flex', textAlign: 'center', margin: '15px 0' }}>{children}</div>
}
