import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import ExampleButton from './show_example/ExampleButton'
import MyRating from './scores_and_stats/Rating'


const ModelCard = ({modelData, onClick, handleDelete}) => {
    const [CreationString, setCreationString] = React.useState("")
    const fileName = modelData['file_name']
    const dateTime = modelData['date_time']
    const featuresLabels = modelData['report']['features_labels']
    const classificationType = modelData['report']['classification_type']
    const accuracy = modelData['report']['accuracy']

    React.useEffect(() => {
        getStringOfDaysFromCreation()
        console.log("Here")
      }, [dateTime]); // get CreationString when datetime changes


    const getStringOfDaysFromCreation = () => {
        let dateTimeCreated = new Date(dateTime)
        let dateTimeCurrent = new Date()
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = dateTimeCurrent.getTime() - dateTimeCreated.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);
        
        console.log(diffInDays)

        if(diffInDays === 0)
            setCreationString("Created Today")
        else
            setCreationString(`Created ${diffInDays} Days Ago`)
    }

    return (
        <div style={{color: "black", textAlign: 'center'}}>
                <Card style={{width: '20rem' }}>
                <Card.Body >
                    <CloseButton onClick={handleDelete}/>
                    <Button 
                        style={{paddingLeft: '4rem', paddingRight: '4rem'}}
                        onClick={onClick}
                        variant="white">
                        <Card.Title>{fileName}</Card.Title>
                        Classification Type: <strong>{classificationType}</strong>
                        <MyRating value={accuracy * 5} />
                        <hr/>
                        <Card.Subtitle className="mb-2 text-muted">{dateTime}</Card.Subtitle>
                    </Button>
                    <hr/>
                    <Card.Text>
                        <ExampleButton
                            buttonText={"Show Attributes Of Model"}
                            tableTitle={"Attributes:"}
                            tableFeatures={featuresLabels}
                            tableItems={[]}
                        />
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted" style={{backgroundColor: '#ffcc80'}}>
                    {CreationString}
                </Card.Footer>
                </Card>
            
        </div>
    )
}

export default ModelCard
