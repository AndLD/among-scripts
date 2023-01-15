import { useState } from 'react'
import { IPagination } from '../../../utils/interfaces'
import { IUserInfo } from '../../../utils/interfaces/user'
import { useFetchUsers } from '../../store/users.api'

export function useUsersContextValue() {
    const tableDataState = useState<IUserInfo[]>([])
    const paginationState = useState<IPagination>({
        current: 1,
        pageSize: 20
    })
    const isTableLoadingState = useState<boolean>(false)
    const searchValueState = useState<string>()
    const statusFilterState = useState<any>()

    useFetchUsers(paginationState[0], tableDataState[1])

    return {
        tableDataState,
        paginationState,
        isTableLoadingState,
        searchValueState,
        statusFilterState
    }
}
