import Modal from 'react-bootstrap/Modal'
import Button from '@mui/material/Button';

const DeleteConfirmationModal = ({show, onHide, onDelete}) => {
    return (
        <div>
            <Modal 
                show={show} 
                onHide={onHide}
                style={modalStyle}
                centered
                animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Delete Confirmation </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:'center'}} >
                        Are you sure you want to delete model?{'  '}
                        <Button color="error" onClick={onDelete}>delete</Button>
                        <Button color="success" onClick={onHide}>Keep</Button>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

const modalStyle = {
    fontFamily: 'Calibri light',
    fontSize:'1rem'
  };

export default DeleteConfirmationModal