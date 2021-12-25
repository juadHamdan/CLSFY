import React from 'react'
import { useState } from 'react'
import AppSwitch from'./AppSwitch'
import UploadFile from './UploadFile'
import ExampleButton from '../show_example/ExampleButton'
import Container from '@mui/material/Container';

const HandleFile = ({uid, onFileSubmit, handleSwitch, TextString, FeaturesString, classifyingType, firstColor, secondColor, themeColor}) => {
    return (
        <Container maxWidth='md' sx={{width: "90%"}}>
            <p style={{fontFamily: "Calibri light", fontSize: "1.5rem", color: "#bdbdbd", paddingLeft: "0.5rem", textDecoration: "underline"}}>
                Choose Classifyier Type
            </p>
            <AppSwitch 
                leftSwitchText={TextString}
                rightSwitchText={FeaturesString}
                onSwitch={handleSwitch}
                firstColor={firstColor}
                secondColor={secondColor}
            />
            
            <div style={{color: themeColor, fontSize: '1.3rem'}}>
                <hr/>
                Upload Excel file is in the following format:
                <br/>
                {classifyingType === FeaturesString?
                <>
                    Features (Numbers) | Class (Numbers or Strings)
                    <br/><br/>

                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for features classification"}
                        tableFeatures={["Feature 1", "Feature 2", "Feature 3" , "...", "Class"]} 
                        tableItems={[["0", "1", "0", "...", "0"]]}
                    />
                </>
                :
                <>
                    Text (Numbers) | Class (Numbers or Strings)
                    <br/><br/>
                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for text classification"}
                        tableFeatures={["Text", "Class"]} 
                        tableItems={[["text1", "class1"]]}
                    />
                </>
                }   
                <hr/>
                <UploadFile 
                    url={classifyingType === "Text" ? '/classify-text/' + uid : 'classify-features/' + uid}
                    onSubmit={onFileSubmit}
                    successMessage={"Model trained successfully"}
                    awaitMessage={"File uploaded, Training model..."}
                />
            </div>
        </Container>
    )
}

export default HandleFile
