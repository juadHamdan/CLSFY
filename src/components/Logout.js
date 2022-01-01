import firebase from './firebase-config'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
  
const Logout = ({show, onHide, onLogoutSuccess}) => {
    const [success, setSuccess] = useState(false)

    const handleSuccess = () => {
        onLogoutSuccess(true)
        setSuccess(true)
    }
    const handleFailure = () => {
        onLogoutSuccess(false)
        setSuccess(false)
    }

    const handleLogout = () => {
        firebase.auth().signOut()
            .then(function() {
                handleSuccess()
            })
            .catch(function(error) {
                handleFailure()
            });
        }

    return (
        <div>
            <Modal 
                size='sm'
                show={show} 
                onHide={onHide}
                style={modalStyle}
                onEnter={handleLogout}
                centered
                animation={false}
                >
                <Modal.Header closeButton>
                    <Modal.Body style={{textAlign: 'center'}}> 
                    {success? 
                    <>Logged Out Successfully </>
                    : 
                    <> <i className="bi bi-exclamation-circle">{' '}Please login</i></> }
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default Logout

const modalStyle = {
    padding: "80px",
    fontFamily: 'Calibri light',
    fontSize:'18px'
  };
