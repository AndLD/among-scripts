import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/store/index'
import { adminSlice } from '../../../store/admin.reducer'

export default function AdminMenuTrigger() {
    const dispatch = useAppDispatch()

    const isMenuCollapsed = useAppSelector((state) => state.adminReducer.isMenuCollapsed)

    const onClick = () => {
        dispatch(adminSlice.actions.setIsMenuCollapsed(!isMenuCollapsed))
    }

    return isMenuCollapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={onClick} />
    ) : (
        <MenuFoldOutlined className="trigger" onClick={onClick} />
    )
}
