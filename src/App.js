import React from 'react';
import './App.css';
import { useState, useRef } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import AppBar from'./components/AppBar'
import About from'./components/About'
import AppStepper from'./components/AppStepper'

import HandleFile from'./components/file_handling/HandleFile'
import ModelsCards from'./components/ModelsCards'
import ScoresAndStats from'./components/scores_and_stats/ScoresAndStats'
import HandleDataToPredict from'./components/handle_data_to_predict/HandleDataToPredict'

import Container from '@mui/material/Container';
import { Snackbar } from '@mui/material';

const TextString = "Text"
const FeaturesString = "Features"

const TextClassificationColor = "#ffcc80"
const FeaturesClassificationColor = "#80cbc4"

const anonymousString = "Anonymous"
const signedString = "Signed"

const uploadStep = 0
const reportStep = 1
const PredictStep = 2

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

function App()
{
  const [activeStep, setActiveStep] = useState(uploadStep)
  const [themeColor, setThemeColor] = useState(TextClassificationColor)  
  const [classifyingType, setClassifyingType] = useState(TextString)
  const [report, setReport] = useState({})
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(anonymousString)
  const [uid, setUid] = useState(uuidv4()) //generate unique id for anonymous user
  const [featuresLabels, setFeaturesLabels] = useState([])
  const [modelId, setModelId] = useState(null)
  const [modelsData, setModelsData] = useState(null)
  const [message, setMessage] = useState(null)
  const [switchOn, setSwitchOn] = useState(false)
  const [disableSwitch, setDisabledSwitch] = useState(false)

  const deleteModelFromDatabase = async (uid, modelIdToDelete) => {
    const url = 'model/' + uid
    try {
        const res = await axios({
            method: 'delete',
            url: url,
            data:{
              modelIdToDelete
            }
        });
        console.log(res.data)
      } 
      catch (err) 
      {
        console.log(err.response.status)
      }
}

  const fetchModelsData = async (uid) => {
    const url = 'models-data/' + uid
    try {
        const res = await axios({
            method: 'get',
            url: url
        });
        console.log(res.data)
        setModelsData(res.data['models_data'])
      } 
      catch (err) 
      {
        console.log(err.response.status)
      }
}

  const onLogin = async (userFromLogin) => {
    setUser(userFromLogin)
    setUserType(signedString)
    setUid(userFromLogin.uid)
    fetchModelsData(userFromLogin.uid)
  }

  const onLogout = () => {
    console.log("LOGOUT")
    setUser(null)
  }

  const onPredictFormSubmit = async (predictedClass) => {
    console.log(predictedClass)
    //predictFeatures(dataToPredict)
    //send to 
  }

  const onPredictFileSubmit = (predictedClass) => {
    console.log(predictedClass)
  }

  const onFileSubmit = async (data) => {
    setDisabledSwitch(true)
    setActiveStep(reportStep)
    setModelId(data['file_id'])
    console.log(data['report'])
    const dataReport = data['report']
    console.log(typeof dataReport)
    setReport(dataReport)
    setFeaturesLabels(data['report']['features_labels'])
    setMessage('Trained model saved')
  }

  const handleSwitch = (SwitchTextString) => {
    setClassifyingType(SwitchTextString)
    if(!switchOn)
      setThemeColor(FeaturesClassificationColor)
    else
      setThemeColor(TextClassificationColor)
    setSwitchOn(!switchOn)
  }

  const deleteModelFromModelsData = (modelIdToDelete) => {
    const newModelsData = modelsData.filter(modelData => modelData['id'] !== modelIdToDelete)
    console.log(newModelsData)
    setModelsData(newModelsData)
  }

  const onModelSelection = (modelId, features) => {
    setFeaturesLabels(features)
    setModelId(modelId)
    setActiveStep(PredictStep)
    executeScrollStart()
  }

  const handleModelDelete = (modelIdToDelete) => {
    deleteModelFromModelsData(modelIdToDelete)
    deleteModelFromDatabase(uid, modelIdToDelete)
  }

  const handleActiveSetChange = (step) => {
    setActiveStep(step)
  }

  const homeRef = useRef(null)
  const executeScrollHome = () => scrollToRef(homeRef)
  const startRef = useRef(null)
  const executeScrollStart = () => scrollToRef(startRef)

  const testButtonClick = () => {
    setMessage('Scores & Stats updated')
  }

  return ( 
    <div style={{fontFamily: 'Calibri light', fontSize: '1.25rem'}}>
      <Snackbar
        open={message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
        message={message}
      />

      <Container ref={homeRef} sx={{width: "90%"}}>
        <AppBar
          user={user} 
          handleLogin={onLogin} 
          handleLogout={onLogout}
          handleHomeClick={executeScrollHome}
          handleStartClick={executeScrollStart}
        />
        <div style={{ height: '10rem' }} />
        <About user={user}/>
        <button onClick={testButtonClick}>Test</button>
        <br/>
        {modelsData?
          <>
            <ModelsCards 
              modelsData={modelsData}
              onModelSelection={onModelSelection}
              handleModelDelete={handleModelDelete}
            /> 
            <hr/>
          </>
        : null}

      </Container>

      <div className="waves" role="presentation"></div>
      <div className="content-bottom" ref={startRef} style={{color: themeColor}}>
        <div style={{ height: '5rem' }} />
          <AppStepper
            activeStep={activeStep}
            setActiveStep={handleActiveSetChange}
            firstStepComponent={
              <HandleFile 
                uid={uid}
                onFileSubmit={onFileSubmit}
                handleSwitch={handleSwitch}
                switchOn={switchOn}
                disableSwitch={disableSwitch}
                classifyingType={classifyingType}
                themeColor={themeColor}
                TextClassificationColor={TextClassificationColor}
                FeaturesClassificationColor={FeaturesClassificationColor}
                TextString={TextString}
                FeaturesString={FeaturesString}
              />}
            secondStepComponent={
              <ScoresAndStats 
                report={report}
              />}
            thirdStepComponent={
              <HandleDataToPredict 
                uid={uid}
                classifyingType={classifyingType}
                featuresLabels={featuresLabels}
                onPredictFormSubmit={onPredictFormSubmit}
                onPredictFileSubmit={onPredictFileSubmit}
                modelId={modelId}
              />}
          />
          <div style={{ height: '10rem' }} />
        </div>
    </div>
  );
}

const appStyle = 
{
  backgroundColor: '#444',
  color: 'white',
}

export default App;