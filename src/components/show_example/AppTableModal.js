import AppTable from './AppTable'
import Modal from 'react-bootstrap/Modal'

const AppTableModal = ({show, onHide, title, features, items, additionalText}) => {
    return (
        <div>
            <Modal 
                size='xl'
                show={show} 
                onHide={onHide}
                style={modalStyle}
                centered
                animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {title} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:'center'}} >

                        <AppTable 
                            features={features}
                            items={items}
                            additionalText={additionalText}
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