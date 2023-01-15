import DashboardRows from '../components/Dashboard/DashboardRows'
import { dashboardContext } from '../contexts'
import { useDashboardContextValue } from '../hooks/pages/Dashboard'
import { useTitle } from '../hooks/pages/layout'

export default function Dashboard() {
    useTitle('Dashboard')

    return (
        <dashboardContext.Provider value={useDashboardContextValue()}>
            <DashboardRows />
        </dashboardContext.Provider>
    )
}
