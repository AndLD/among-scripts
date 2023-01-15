import { BugOutlined } from '@ant-design/icons'

export default function useReportBugMenuItem(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    return {
        key: 'report-bug',
        icon: <BugOutlined onClick={() => setOpen(true)} style={{ marginRight: '4px', fontSize: '20px' }} />,
        label: (
            <div onClick={() => setOpen(true)} style={{ fontSize: '17px' }}>
                Повідомити про помилку
            </div>
        )
    }
}
