import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import ExampleButton from './show_example/ExampleButton'


const ModelCard = ({fileName, dataTime, featuresNames, onClick, handleDelete}) => {
    
    return (
        <div style={{color: "black", textAlign: 'center'}}>
                <Card style={{ width: '17rem' }}>
                <Card.Body >
                    <CloseButton onClick={handleDelete}/>
                    <Button 
                        style={{paddingLeft: '4rem', paddingRight: '4rem'}}
                        onClick={onClick}
                        variant="light">
                        <Card.Title>{fileName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{dataTime}</Card.Subtitle>
                    </Button>
                    <hr/>
                    <Card.Text>
                        <ExampleButton
                            buttonText={"Show Model Features"}
                            tableTitle={"Features:"}
                            tableFeatures={featuresNames}
                            tableItems={[]}
                        />
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            
        </div>
    )
}

export default ModelCard
