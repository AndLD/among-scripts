import { QuestionOutlined, SafetyCertificateOutlined, StopOutlined, UserOutlined } from '@ant-design/icons'
import { Select, Table } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { usersContext } from '../../contexts'
import { useToken } from '../../hooks/auth'
import { usePutUser } from '../../hooks/store/users.api'
import { useFetchUsersQuery } from '../../store/users.api'
import { IUserInfo, UserStatus } from '../../utils/interfaces/user'
import { parseUser } from '../../utils/jwt'

function UsersTable() {
    const token = useToken()
    const {
        tableDataState: [tableData, setTableData],
        isTableLoadingState: [isTableLoading, setIsTableLoading],
        paginationState: [pagination, setPagination],
        searchValueState: [searchValue, setSearchValue],
        statusFilterState: [statusFilter, setStatusFilter]
    } = useContext(usersContext)
    const [order, setOrder] = useState<string | undefined>()
    const [isFetchUsersQuerySkip, setIsFetchUsersQuerySkip] = useState(true)

    const fetchUsersQuery = useFetchUsersQuery(
        {
            pagination,
            order,
            filters: statusFilter ? statusFilter && `status,in,${statusFilter.join('.')}` : undefined
        },
        { skip: isFetchUsersQuerySkip }
    )

    const putUser = usePutUser()

    useEffect(() => {
        if (fetchUsersQuery.data) {
            setTableData(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])

    return (
        <Table
            dataSource={tableData}
            columns={[
                {
                    title: '#',
                    render: (_, row, index) => index + 1 + (pagination.current - 1) * pagination.pageSize,
                    width: 70
                },
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: "Ім'я та прізвище",
                    dataIndex: 'name'
                },
                {
                    title: 'Email',
                    dataIndex: 'email'
                },
                {
                    title: 'Статус',
                    dataIndex: 'status',
                    render: (status: UserStatus, row: IUserInfo) => {
                        if (row.id === parseUser(token)?.id) {
                            let component: any

                            switch (status) {
                                case UserStatus.ADMIN:
                                    component = <SafetyCertificateOutlined style={{ color: 'green' }} />
                                    break
                                case UserStatus.PLAYER:
                                    component = <UserOutlined style={{ color: 'blue' }} />
                                    break
                                case UserStatus.BANNED:
                                    component = <StopOutlined style={{ color: 'red' }} />
                                    break
                            }
                            return (
                                <>
                                    {component} {status[0].toUpperCase() + status.slice(1)}
                                </>
                            )
                        }

                        return (
                            <Select
                                defaultValue={status}
                                style={{ width: '100%' }}
                                onChange={(status) => putUser(row.id, status)}
                            >
                                <Select.Option value="admin">
                                    <SafetyCertificateOutlined style={{ color: 'green' }} /> Admin
                                </Select.Option>
                                <Select.Option value="user">
                                    <UserOutlined style={{ color: 'blue' }} /> User
                                </Select.Option>
                                <Select.Option value="banned">
                                    <StopOutlined style={{ color: 'red' }} /> Banned
                                </Select.Option>
                                <Select.Option value="unconfirmed">
                                    <QuestionOutlined /> Unconfirmed
                                </Select.Option>
                            </Select>
                        )
                    },
                    filters: [
                        {
                            text: (
                                <>
                                    <SafetyCertificateOutlined style={{ color: 'green' }} /> Admin
                                </>
                            ),
                            value: 'admin'
                        },
                        {
                            text: (
                                <>
                                    <UserOutlined style={{ color: 'blue' }} /> User
                                </>
                            ),
                            value: 'user'
                        },
                        {
                            text: (
                                <>
                                    <StopOutlined style={{ color: 'red' }} /> Banned
                                </>
                            ),
                            value: 'banned'
                        },
                        {
                            text: (
                                <>
                                    <QuestionOutlined /> Unconfirmed
                                </>
                            ),
                            value: 'unconfirmed'
                        }
                    ],
                    filteredValue: statusFilter ? statusFilter.status : null
                },

                {
                    title: 'Відмітка часу',
                    dataIndex: 'timestamp',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: any, row2: any) => row1.timestamp - row2.timestamp,
                    sortDirections: ['descend']
                },
                {
                    title: 'Мітка часу останнього оновлення',
                    dataIndex: 'lastUpdateTimestamp',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: any, row2: any) => row1.lastUpdateTimestamp - row2.lastUpdateTimestamp,
                    sortDirections: ['ascend', 'descend']
                }
            ]}
            rowKey={(record: any) => record.id}
            pagination={pagination}
            loading={isTableLoading}
            onChange={(pagination: any, filters: any, sorter: any) => {
                setStatusFilter(filters.status)
                const sorterOrder = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
                setOrder(sorterOrder && `${sorter.field},${sorterOrder}`)

                setSearchValue('')
                setIsFetchUsersQuerySkip(false)
            }}
        />
    )
}

export default UsersTable
