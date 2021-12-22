import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HandleTextDataToPredict = ({onSubmit}) => {
    const [value, setValue] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = () => {
        if(value === null || value === "")
        {
            setError(true)
            setErrorMessage("Empty")
            return
        }
        setError(false)
        setErrorMessage("")

        onSubmit({Text: value})
    }

    const handleChange = e => {
        setValue(e.target.value)
    }

    return (
        //maxWidth='md' sx={{width: "90%"}}
        <Container sx={{textAlign: "center"}}> 
            <TextField
                focused
                error = {error}
                multiline
                rows={5}
                fullWidth 
                label="Text"
                helperText={errorMessage}
                onChange={handleChange}
            />
            <hr/>
            <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="inherit">
                <Typography sx={{color: "#424242", fontSize: '0.8rem'}}>Upload Text</Typography>
            </Button>
        </Container>
    );
}

export default HandleTextDataToPredict