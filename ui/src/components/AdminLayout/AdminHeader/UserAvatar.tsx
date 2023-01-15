import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

function UserAvatar() {
    return <Avatar style={{ cursor: 'pointer' }} shape="square" icon={<UserOutlined />} />
}

export default UserAvatar
