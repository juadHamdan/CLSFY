import React from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ModelCard from './ModelCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ModelsCards = ({modelsData, onModelSelection, handleModelDelete}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false)
    const [modelIdToDelete, setModelIdToDelete] = React.useState(null)

    const handleModelSelection = (modelId, features, type) => {
        onModelSelection(modelId, features, type)
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

            <Row xs={1} md={2} lg={2} xl={3}>
            {modelsData.map((modelData, idx) => (
                <Col key={idx}>
                    <ModelCard
                        modelData={modelData}
                        onClick={() => handleModelSelection(modelData['id'], modelData['report']['features_labels'], modelData['report']['classification_type'])}
                        handleDelete={() => handleDeleteConfirmation(modelData['id'])}
                    />
                </Col>
            ))}
            </Row>
        </div>
    )
}

export default ModelsCards
