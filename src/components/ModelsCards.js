import React from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ModelCard from './ModelCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ModelsCards = ({modelsData, onModelSelection, handleModelDelete}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false)
    const [modelIdToDelete, setModelIdToDelete] = React.useState(null)

    const handleModelSelection = (modelId, features) => {
        onModelSelection(modelId, features)
    }

    const handleDeleteConfirmation = (modelId) => {
        setModelIdToDelete(modelId)
        setShowDeleteConfirmation(true)
    }

    const deleteModel = () => {
        setShowDeleteConfirmation(false)
        handleModelDelete(modelIdToDelete)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onHide={() => setShowDeleteConfirmation(false)}
                onDelete={deleteModel}
            />

            <Row xs={1} md={2} lg={3}>
            {modelsData.map((modelData, idx) => (
                <Col key={idx}>
                    <ModelCard
                        fileName={modelData['file_name']} 
                        dataTime={modelData['datetime']} 
                        featuresNames={modelData['features_names']}
                        onClick={() => handleModelSelection(modelData['id'], modelData['features_names'])}
                        handleDelete={() => handleDeleteConfirmation(modelData['id'])}
                    />
                </Col>
            ))}
            </Row>
        </div>
    )
}

export default ModelsCards
