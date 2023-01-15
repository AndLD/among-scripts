import {
    AimOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    UserOutlined
} from '@ant-design/icons'
import moment from 'moment'
import { useContext } from 'react'
import DashboardCol from '../../components/Dashboard/DashboardCol'
import DashboardRow from '../../components/Dashboard/DashboardRow'
import { dashboardContext } from '../../contexts'
import { UserStatus } from '../../utils/interfaces/user'

export default function DashboardRows() {
    const [statistics, setStatistics] = useContext(dashboardContext).statisticsState

    return statistics ? (
        <>
            <DashboardRow>
                <DashboardCol
                    title="Users"
                    value={statistics.users[UserStatus.ADMIN]}
                    icon={<UserOutlined style={{ color: 'blue' }} />}
                />
                <DashboardCol
                    title="Admins"
                    value={statistics.users[UserStatus.PLAYER]}
                    icon={<SafetyCertificateOutlined style={{ color: 'green' }} />}
                />
                <DashboardCol
                    title="Banned"
                    value={statistics.users[UserStatus.BANNED]}
                    icon={<StopOutlined style={{ color: 'red' }} />}
                />
            </DashboardRow>
            <DashboardRow>
                <DashboardCol title="Points" value={statistics.pointsTotal} icon={<ThunderboltOutlined />} />
                <DashboardCol title="Resources" value={statistics.resourcesTotal} icon={<CheckSquareOutlined />} />
                <DashboardCol title="Bases" value={statistics.basesTotal} icon={<EnvironmentOutlined />} />
                <DashboardCol title="Bots" value={statistics.botsTotal} icon={<AimOutlined />} />
                <DashboardCol title="Commands" value={statistics.commandsTotal} icon={<TeamOutlined />} />
            </DashboardRow>
            <DashboardRow>
                <DashboardCol
                    title="Час початку"
                    value={moment(statistics.startTimestamp).format('DD.MM.YYYY HH:mm:ss')}
                    icon={<ClockCircleOutlined />}
                />
            </DashboardRow>
        </>
    ) : null
}
