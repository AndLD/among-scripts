import { Button } from 'antd'
import { useEffect, useState } from 'react'
import SigninForm from '../components/Auth/SigninForm'
import SignupModal from '../components/Auth/SignupModal'
import '../styles/Auth.scss'

export default function Auth() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    useEffect(() => {
        document.title = 'Auth'
    }, [])

    function SignupBtn() {
        return (
            <Button className="button" onClick={() => setIsModalVisible(true)} type="link" style={{ color: 'white' }}>
                Sign Up
            </Button>
        )
    }

    return (
        <div className="auth-container">
            <div className="ellipse" />
            <div className="service-number">
                <div>Among</div>
                <div>Bots</div>
            </div>

            <div className="all-group">
                <div className="group">
                    <div className="page-title">
                        <h1 className="title">Among Scripts</h1>
                        <h4 className="sub-title">Conquer or Explore bots world with scripts</h4>
                    </div>

                    <div className="page-form">
                        <SigninForm SignupBtn={SignupBtn} />
                    </div>
                </div>
            </div>
            <SignupModal isModalVisibleState={[isModalVisible, setIsModalVisible]} />
        </div>
    )
}
