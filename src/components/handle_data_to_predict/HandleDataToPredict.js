import React from 'react'
import axios from 'axios';
import HandleTextDataToPredict from './HandleTextDataToPredict'
import HandleFeaturesDataToPredict from './HandleFeaturesDataToPredict'
import UploadFile from '../file_handling/UploadFile'
import Container from '@mui/material/Container';
import ExampleButton from '../show_example/ExampleButton'
import ClassModal from './ClassModal'

const HandleDataToPredict = ({uid, classifyingType, features, onPredictFormSubmit, onPredictFileSubmit, modelId}) => {
    const [classPrediction, setClassPrediction] = React.useState(null)
    const [showClassPrediction, setShowClassPrediction] = React.useState(false)

    const predict = async (url, dataToPredict) => {
        try {
            const res = await axios({
                method: 'post',
                url: url,
                data: {
                    modelId,
                    dataToPredict
                }
            });
            console.log(res.data)
            setClassPrediction(res.data["class"])
            setShowClassPrediction(true)
            onPredictFormSubmit(classPrediction)
            console.log(classPrediction)
          } 
          catch (err) 
          {
            if (err.response.status === 500)
            {
              //setMessage(err.response.statusText)
            }
            else if (err.response.status === 400)
            {
              //setMessage(err.response.statusText, "Only Excel file allowed.")
            }
            else 
            {
            }
          }
    }

    const handleFormSubmit = async (data) => {
        console.log(data)
        const url = (classifyingType === "Text" ? 'predict-data/' + uid : 'predict-features/' + uid)
        predict(url, data)
    }

    const handleFileSubmit = async (data) => {
        console.log("File Submit")
        console.log(data) //Class is here
    }
    

    return (
            //<div style={{color: themeColor, fontSize: '1.3rem'}}>
        <Container maxWidth='md' sx={{width: "90%", fontSize: "1rem"}}>
            <ClassModal
                show={showClassPrediction} 
                onHide={() => setShowClassPrediction(false)} 
                text={classPrediction}
            />
            {classifyingType === "Text"?
                <>
                    You Can Enter Text To Predict The Class
                    <hr/>
                    <HandleTextDataToPredict onSubmit={handleFormSubmit}/>

                    <hr/>
                    Or You Can Upload Excel file in the following format:
                    <br/>
                    Text (Numbers)
                    <br/><br/>

                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for text classification"}
                        tableFeatures={["Text"]} 
                        tableItems={[["text1"]]}
                    />

                </>
                :
                <>
                    You Can Enter Features To Predict The Class
                    <hr/>
                    <HandleFeaturesDataToPredict 
                        features={features} 
                        onSubmit={handleFormSubmit}
                    />
                    <hr/>
                    Or You Can Upload Excel file in the following format:
                    <br/>
                    Features (Numbers)
                    <br/><br/>
                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for features classification"}
                        tableFeatures={["Feature 1", "Feature 2", "Feature 3" , "..."]} 
                        tableItems={[["0", "1", "0", "..."]]}
                    />
                </>
            }   

            <hr/>
            <br/>
            <UploadFile 
                onSubmit={onPredictFileSubmit} 
                url={classifyingType === "Text" ? '/predictTextFile/1' : 'predictFeaturesFile/1'}
                successMessage={"Model trained successfully"}
                awaitMessage={"File uploaded, Training model..."}
            />
        </Container>
    )
}   

export default HandleDataToPredict
