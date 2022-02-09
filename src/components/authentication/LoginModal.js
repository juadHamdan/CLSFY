import firebase from './firebase-config'
import Modal from 'react-bootstrap/Modal'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
  
const LoginModal = ({show, onHide, onLogin}) => {
    const uiConfig = { 
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                onLogin(result.user)
                onHide()
            }
        }
    }

    return (
        <div>
            <Modal 
                show={show} 
                onHide={onHide}
                size='sm'
                style={modalStyle}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Login </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign:'center'}} >
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default LoginModal

const modalStyle = {
    fontFamily: 'Calibri light',
    fontSize:'18px'
  };