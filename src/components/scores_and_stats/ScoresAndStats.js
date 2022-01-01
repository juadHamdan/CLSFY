import React from 'react'
import Rating from './Rating'
import Container from '@mui/material/Container';

function ScoresAndStats({report}) {
    return (
        <Container maxWidth='lg' sx={{width: "90%"}}>
                <nobr style={{fontSize: '1.75rem'}}>Model accuracy  </nobr>
                <Rating value={report['accuracy']? (report['accuracy'] * 5) : 0}/> {' '}
                <nobr style={{fontSize: '0.75rem', verticalAlign: 'middle'}}>({report['accuracy']?? '0'})</nobr>
                <p style={{fontSize: '0.75rem'}}>* Accuracy may vary from classification to classification.</p>
                <hr/>
                Classes Scores: |{' '}
                {report['classes_scores']? 
                    report['classes_scores'].map((classScore, index) => <nobr key={index}>{classScore}{' | '}</nobr>)
                : null}
                <p style={{fontSize: '0.75rem'}}>* In case of class with low score {' ->'} more data of this label needed.</p>
                <hr/>
                5 Best Feature Labels: |{' '}
                {report['best_features_labels']? 
                    report['best_features_labels'].map((featureLabel, index) => <nobr key={index}>{featureLabel}{' | '}</nobr>)
                : null}
        </Container>
    )
}

export default ScoresAndStats
