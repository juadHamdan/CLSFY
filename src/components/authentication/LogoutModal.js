import firebase from './firebase-config'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
  
const LogoutModal = ({show, onHide, onLogout}) => {
    const [message, setMessage] = useState("...")

    const logout = () => {
        firebase.auth().signOut()
            .then(() => {
                setMessage("Logged Out Successfully")
                onLogout()
            })
            .catch((error) => {
                console.log(error)
                setMessage("Error")
            });
        }

    return (
        <div>
            <Modal 
                size='sm'
                show={show} 
                onShow={logout}
                onHide={onHide}
                style={modalStyle}
                centered
                animation={false}
                >
                <Modal.Header closeButton>
                    <Modal.Body style={{textAlign: 'center'}}> 
                        {message}
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default LogoutModal

const modalStyle = {
    padding: "80px",
    fontFamily: 'Calibri light',
    fontSize:'18px'
  };
