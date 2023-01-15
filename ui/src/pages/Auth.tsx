import { Button } from 'antd'
import { useState } from 'react'
import SigninForm from '../components/Auth/SigninForm'
import SignupModal from '../components/Auth/SignupModal'
import { useTitle } from '../hooks/pages/layout'
import '../styles/Auth.scss'

export default function Auth() {
    useTitle('Among Scripts Auth')

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

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
