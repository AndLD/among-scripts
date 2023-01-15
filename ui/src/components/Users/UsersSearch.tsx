import Search from 'antd/lib/input/Search'
import { useContext, useEffect, useState } from 'react'
import { usersContext } from '../../contexts'
import { useFetchUsersQuery } from '../../store/users.api'

function UsersSearch() {
    const [pagination, setPagination] = useContext(usersContext).paginationState
    const [tableData, setTableData] = useContext(usersContext).tableDataState
    const [isTableLoading, setIsTableLoading] = useContext(usersContext).isTableLoadingState
    const [searchValue, setSearchValue] = useContext(usersContext).searchValueState
    const [statusFilter, setStatusFilter] = useContext(usersContext).statusFilterState
    const [delayedSearch, setDeleyedSearch] = useState<NodeJS.Timeout>()

    const [isFetchUsersQuerySkip, setIsFetchUsersQuerySkip] = useState(true)
    const fetchUsersQuery = useFetchUsersQuery(
        {
            pagination,
            filters: searchValue ? `active,==,true;keywords,contains,${searchValue.toLowerCase()}` : 'active,==,true'
        },
        { skip: isFetchUsersQuerySkip }
    )

    useEffect(() => {
        if (fetchUsersQuery.data) {
            setTableData(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])

    return (
        <Search
            style={{ marginBottom: 20 }}
            placeholder="Пошук по імені або email"
            loading={isTableLoading}
            value={searchValue}
            onChange={(event) => {
                // TODO: Do not set status filter to 'null', instead of that create 'combineFilters' function to combine 'statusFilter' and 'searchValue' values
                setStatusFilter(null)

                const text = event.target.value
                setSearchValue(text)

                if (delayedSearch) {
                    clearTimeout(delayedSearch)
                }

                setDeleyedSearch(
                    setTimeout(() => {
                        setIsFetchUsersQuerySkip(false)
                    }, 500)
                )
            }}
            enterButton
        />
    )
}

export default UsersSearch
