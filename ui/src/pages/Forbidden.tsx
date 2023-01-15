import LogoutBtn from '../components/Forbidden/LogoutBtn'
import '../styles/Forbidden.scss'
import ForbiddenContent from '../components/Forbidden/ForbiddenContent'

export default function Forbidden() {
    return (
        <div className="forbidden-container">
            <div className="ellipse" />

            <div className="title">waiting room</div>

            <ForbiddenContent />

            <div style={{ marginTop: 30 }}>
                <LogoutBtn />
            </div>
        </div>
    )
}
