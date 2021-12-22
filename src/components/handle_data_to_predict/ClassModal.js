import Modal from 'react-bootstrap/Modal'

const ClassModal = ({show, onHide, text}) => {
    return (
        <div>
            <Modal 
                size="sm"
                show={show} 
                onHide={onHide}
                style={modalStyle}
                centered
                >
                    <Modal.Body closeButton>
                        <Modal.Title style={{textAlign:'center'}}> {text} </Modal.Title>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

const modalStyle = {
    fontFamily: 'Calibri light',
    fontSize:'1rem'
  };

export default ClassModal