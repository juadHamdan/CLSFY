import React from 'react';
import './App.css';
import { useState, useRef } from 'react'
import HandleModels from './HandleModels'
import { v4 as uuidv4 } from 'uuid';

import { TextClassificationColor, TextString, FeaturesClassificationColor, FeaturesString } from './constants/Global'
import AppBar from'./components/AppBar'
import About from'./components/About'
import AppStepper from'./components/AppStepper'

import HandleFile from'./components/file_handling/HandleFile'
import ModelsCards from'./components/ModelsCards'
import ScoresAndStats from'./components/scores_and_stats/ScoresAndStats'
import HandleDataToPredict from './components/handle_data_to_predict/HandleDataToPredict'
import BackdropProgress from './components/BackdropProgress'

import Container from '@mui/material/Container';
import { Snackbar } from '@mui/material';

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
  const [uid, setUid] = useState(uuidv4()) //generate unique id for anonymous user
  const [featuresLabels, setFeaturesLabels] = useState([])
  const [modelId, setModelId] = useState(null)
  const [message, setMessage] = useState(null)
  const [switchOn, setSwitchOn] = useState(false)
  const [disableSwitch, setDisabledSwitch] = useState(false)
  const [showBackdropProgress, setShowBackdropProgress] = useState(false)

  const { modelsData, fetchModelsData, deleteModelFromModelsData, deleteModelFromDatabase, resetModelsData  } = HandleModels()

  const onLogin = async (userFromLogin) => {
    setUser(userFromLogin)
    setUid(userFromLogin.uid)

    setShowBackdropProgress(true)
    await fetchModelsData(userFromLogin.uid)
    setShowBackdropProgress(false)
  }

  const onLogout = () => {
    setUser(null)
    resetModelsData()
    window.location.reload()
  }

  const onPredictFormSubmit = async (predictedClass) => {
    console.log(predictedClass)
  }

  const onPredictFileSubmit = (predictedClass) => {
    console.log(predictedClass)
  }

  const onFileSubmit = async (data) => {
    setDisabledSwitch(true)
    setActiveStep(reportStep)
    setModelId(data['file_id'])
    setReport(data['report'])
    setFeaturesLabels(data['report']['features_labels'])
    setMessage('Trained model saved.')
  }

  const handleSwitch = () => {
    if(!switchOn)
    {
      setClassifyingType(FeaturesString)
      setThemeColor(FeaturesClassificationColor)
    }
    else
    {
      setClassifyingType(TextString)
      setThemeColor(TextClassificationColor)
    }
    setSwitchOn(!switchOn)
  }

  const onModelSelection = (modelId, features, type) => {
    if(type === TextString)
    {
      setClassifyingType(TextString)
      setThemeColor(TextClassificationColor)
    }
    else
    {
      setClassifyingType(FeaturesString)
      setThemeColor(FeaturesClassificationColor)
      setFeaturesLabels(features)
    }
    setModelId(modelId)
    setActiveStep(PredictStep)
    executeScrollStart()
  }

  const handleModelDelete = (modelIdToDelete) => {
    deleteModelFromModelsData(modelIdToDelete)
    deleteModelFromDatabase(uid, modelIdToDelete)
    setMessage("Model deleted")
  }

  const handleActiveSetChange = (step) => {
    setActiveStep(step)
  }

  const homeRef = useRef(null)
  const executeScrollHome = () => scrollToRef(homeRef)
  const startRef = useRef(null)
  const executeScrollStart = () => scrollToRef(startRef)

  return ( 
    <div style={{fontFamily: 'Calibri light', fontSize: '1.25rem'}}>
      <BackdropProgress 
        show={showBackdropProgress} 
        text={'Checking For Saved Models...'}
      />

      <Snackbar
        open={message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
        message={message}
      />


      <Container ref={homeRef} sx={{width: "90%"}}>
        <AppBar
          user={user} 
          onLogin={onLogin} 
          onLogout={onLogout}
          handleHomeClick={executeScrollHome}
          handleStartClick={executeScrollStart}
        />
        <div style={{ height: '10rem' }} />
        <About user={user}/>
        <div style={{ height: '5rem' }} />
        {modelsData?
          <div style={{textAlign: 'center'}}>
            <strong style={{textAlign: 'center'}}>Predict using saved models</strong>
            <hr/>
            <ModelsCards 
              modelsData={modelsData}
              onModelSelection={onModelSelection}
              handleModelDelete={handleModelDelete}
            /> 
            <hr/>
            <div style={{ height: '5rem' }} />
          </div>
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

export default App;