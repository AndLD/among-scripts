import UsersSearch from '../components/Users/UsersSearch'
import UsersTable from '../components/Users/UsersTable'
import { usersContext } from '../contexts'
import { useTitle } from '../hooks/pages/layout'
import { useUsersContextValue } from '../hooks/pages/Users'
import '../styles/Users.scss'

function Users() {
    useTitle('Users')

    return (
        <usersContext.Provider value={useUsersContextValue()}>
            <UsersSearch />
            <UsersTable />
        </usersContext.Provider>
    )
}

export default Users
