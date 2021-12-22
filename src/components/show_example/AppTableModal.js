import AppTable from './AppTable'
import Modal from 'react-bootstrap/Modal'

const AppTableModal = ({show, onHide, title, features, items}) => {
    return (
        <div>
            <Modal 
                show={show} 
                onHide={onHide}
                style={modalStyle}
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {title} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:'center'}} >

                        <AppTable 
                            features={features}
                            items={items}
                        />


                    </Modal.Body>
            </Modal>
        </div>
    )
}

const modalStyle = {
    fontFamily: 'Calibri light',
    fontSize:'1rem'
  };

export default AppTableModal