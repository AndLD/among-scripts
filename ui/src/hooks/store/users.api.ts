import { useContext, useEffect } from 'react'
import { usersContext } from '../../contexts'
import { useFetchUsersQuery, useFetchVerifyEmailQuery, usePutUserMutation } from '../../store/users.api'
import { IPagination } from '../../utils/interfaces'
import { IUserInfo, UserStatus } from '../../utils/interfaces/user'
import { errorNotification } from '../../utils/notifications'
import { useToken } from '../auth'

export function useFetchUsers(pagination: IPagination, callback: (result: IUserInfo[]) => void) {
    const token = useToken()

    const fetchUsersQuery = useFetchUsersQuery({ pagination, filters: 'active,==,true' }, { skip: !token })

    useEffect(() => {
        if (fetchUsersQuery.data) {
            callback(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])
}

export function usePutUser() {
    const [tableData, setTableData] = useContext(usersContext).tableDataState

    const [putUserMutation] = usePutUserMutation()

    return (id: number, status: UserStatus) =>
        putUserMutation({
            id,
            body: {
                status
            }
        }).then((value: any) => {
            if (value.data) {
                const user = value.data.result
                const newStatus = user?.status
                if (newStatus === status) {
                    setTableData([
                        ...tableData.map((tr: IUserInfo) => {
                            if (tr.id === id) {
                                return user
                            }
                            return tr
                        })
                    ])
                } else {
                    errorNotification('User status not updated', 'Unable to update user')
                }
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Unable to update user')
            }
        })
}

export function useVerifyEmail(emailVerificationToken: string | null, callback: () => void) {
    const fetchVerifyEmailQuery = useFetchVerifyEmailQuery({ emailVerificationToken })

    useEffect(() => {
        if (fetchVerifyEmailQuery.isSuccess) {
            callback()
        }
    }, [fetchVerifyEmailQuery.isSuccess])

    useEffect(() => {
        if (fetchVerifyEmailQuery.isError) {
            errorNotification('Email Confirmation Error')
            callback()
        }
    }, [fetchVerifyEmailQuery.isError])
}
