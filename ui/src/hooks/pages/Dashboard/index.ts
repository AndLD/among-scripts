import { useState } from 'react'
import { IStatistics } from '../../../utils/interfaces/statistics'
import { useFetchStatistics } from '../../store/statistics.api'

export function useDashboardContextValue() {
    const [statistics, setStatistics] = useState<IStatistics | null>(null)

    useFetchStatistics(setStatistics)

    return {
        statisticsState: [statistics, setStatistics] as [
            IStatistics | null,
            React.Dispatch<React.SetStateAction<IStatistics | null>>
        ]
    }
}
