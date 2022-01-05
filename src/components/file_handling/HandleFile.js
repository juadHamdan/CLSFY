import React from 'react'
import { TextString, FeaturesString } from '../../constants/Global'
import AppSwitch from'./AppSwitch'
import UploadFile from './UploadFile'
import ExampleButton from '../show_example/ExampleButton'
import Container from '@mui/material/Container';

const HandleFile = ({uid, onFileSubmit, handleSwitch, switchOn, disableSwitch, classifyingType, themeColor}) => {
    return (
        <Container maxWidth='md' sx={{width: "90%"}}>
            <nobr><strong>Choose Classifyier Type</strong></nobr>
            <AppSwitch 
                leftSwitchText={TextString}
                rightSwitchText={FeaturesString}
                onSwitch={handleSwitch}
                switchOn={switchOn}
                disableSwitch={disableSwitch}
            />
            
            <div style={{color: themeColor, fontSize: '1.3rem'}}>
                <hr/>
                Upload Excel file is in the following format:
                <br/>
                {classifyingType === FeaturesString?
                <>
                    Feature 1 (Number) | Feature 2 (Number) | ... | Feature n (Number) | Class (Number Or String)
                    <br/><br/>
                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for features classification"}
                        tableFeatures={["Feature 1 (1-Yes, 0-No)", "Feature 2", "Feature 3" , "...", "Class"]} 
                        tableItems={[["0", "8", "127", "...", "Great"], ["1", "6", "250", "...", "Bad"], ['...', '...', '...', '...', '...']]}
                        tableAdditionalText={' * Features must be numbers, classes can be text or numbers'}
                    />
                </>
                :
                <>
                    Text | Class (Number Or String)
                    <br/><br/>
                    <ExampleButton
                        buttonText={"Show Example"}
                        tableTitle={"File upload example for text classification"}
                        tableFeatures={["Text", "Class"]} 
                        tableItems={[["text", "Well Done"], ['text', 'Fail'], ["...", '...']]}
                        tableAdditionalText={' * Classes can be text or numbers'}
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
