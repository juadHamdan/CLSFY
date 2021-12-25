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
                animation={false}
                >
                    <Modal.Body closeButton>
                        <Modal.Title style={{textAlign:'center'}}> Class Prediction: {text} </Modal.Title>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

const modalStyle = {
    color: 'black',
    fontFamily: 'Calibri light',
    fontSize:'1rem'
  };

export default ClassModal