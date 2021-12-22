import React from 'react'
import Rating from './Rating'
import Container from '@mui/material/Container';

function ScoresAndStats({accuracy}) {
    return (
        <Container maxWidth='md' sx={{width: "90%"}}>

                <Rating value={(accuracy * 5)}/>
                <hr/>
                Model accuracy = {accuracy}
                <hr/>
                * Accuracy may vary from classification to classification.

                --Add here confusion matrix and all of the classes f1-scores.
            
        </Container>
    )
}

export default ScoresAndStats
