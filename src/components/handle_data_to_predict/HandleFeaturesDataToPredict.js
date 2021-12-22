import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from 'react-bootstrap/Alert'

const HandleFeaturesDataToPredict = ({features, onSubmit}) => {
    const [featuersValuesDict] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = () => {
        console.log(features.length)
        console.log(Object.keys(featuersValuesDict).length)

        if (features.length > Object.keys(featuersValuesDict).length)
        {
            console.log("Error")
            setError(true)
            setErrorMessage("One feature (or more) is empty")
            return
        }
        setError(false)
        setErrorMessage("")
        console.log(featuersValuesDict)
        onSubmit(featuersValuesDict)
    }

    const handleFeatureFieldChange = e => {
        let featureTextChanged = e.target.labels[0].childNodes[0].data;
        //update the value of current feature 
        featuersValuesDict[featureTextChanged] = e.target.value
    }

    return (
        //<Container maxWidth='md' sx={{width: "90%"}}>
        <Container sx={{textAlign: "center"}}>
            {error ? 
            <Alert variant="danger">
              {errorMessage}
            </Alert>
             : null}

            <Grid sx={{textAlign: "center"}} container spacing={1}>
                {features.map((feature, index) => 
                    <Grid key={index} item xs={2}>
                        <TextField 
                            focused
                            error = {error}
                            label={feature}
                            onChange={handleFeatureFieldChange}/>
                    </Grid>
                )}
            </Grid>
            <hr/>

            <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="inherit">
                <Typography sx={{color: "#424242", fontSize: '0.8rem'}}>Upload Features</Typography>
            </Button>
        </Container>
    );
}

export default HandleFeaturesDataToPredict