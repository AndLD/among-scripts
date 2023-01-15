import { Dropdown, Menu } from 'antd'
import useLogoutMenuItem from './useLogoutMenuItem'
import UserAvatar from './UserAvatar'

export default function UserDropdown() {
    return (
        <>
            <Dropdown
                overlay={
                    <Menu
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }}
                        items={[useLogoutMenuItem()]}
                    />
                }
                arrow={{ pointAtCenter: true }}
                trigger={['click']}
                placement="bottomLeft"
            >
                <div style={{ marginLeft: '20px' }}>
                    <UserAvatar />
                </div>
            </Dropdown>
        </>
    )
}
