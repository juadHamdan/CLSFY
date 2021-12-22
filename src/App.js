import React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import AppBar from'./components/AppBar'
import About from'./components/About'
import AppStepper from'./components/AppStepper'

import HandleFile from'./components/file_handling/HandleFile'
import ScoresAndStats from'./components/scores_and_stats/ScoresAndStats'
import HandleDataToPredict from'./components/handle_data_to_predict/HandleDataToPredict'

import Container from '@mui/material/Container';


const TextString = "Text"
const FeaturesString = "Features"

const firstColor = "#ffcc80"
const secondColor = "#80cbc4"

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

function App()
{
  const [themeColor, setThemeColor] = useState(firstColor)  
  const [classifyingType, setClassifyingType] = useState(TextString)
  const [accuracy, setAccuracy] = useState(0)
  const [user, setUser] = useState(null)
  const [features, setFeatures] = useState({})
  const [modelId, setModelId] = useState(null)
  const [uid] = useState(1)

  const [mandatoryCourses, setMandatoryCourses] = useState(null)
  const [electiveCourses, setElectiveCourses] = useState(null)
  const [userHaveSchedulerData, setUserHaveSchedulerData] = useState(false)
  const [publishedSchedulersData, setPublishedSchedulersData] = useState([])
  const [sharedSchedulersData, setSharedSchedulersData] = useState([])


  useEffect(async () => {
    /*
    const schedulersDataRes = await fetch('/schedulersData')
    const schedulersData = await schedulersDataRes.json()
    console.log("Home Page schedulers: ", Object.values(schedulersData))
    setPublishedSchedulersData(Object.values(schedulersData))

    const usersRes = await fetch('/getUsersInfo')
    const usersData = await usersRes.json()
    console.log(Object.values(usersData))
    setUsers(Object.values(usersData))
    */
  }, []);
/*
  const checkUserCoursesExists = async (uid) => {
    var url = '/checkUserCourses/' + uid
    const res = await fetch(url)
    if(res.status === 200) //user database courses exists
    {
      console.log('User have courses.')
      return true
    }
    if(res.status === 400)
    {
      return false
    }
  }

  const checkUserSchedulerDataExists = async (uid) => {
    var url = '/checkUserScheduleData/' + uid
    const res = await fetch(url)
    if(res.status === 200) //user database exists
    {
      console.log('User have scheduler data.')
      return true
    }
    else
    {
      return false
    }
  }

  const checkSharedSchedulersDataExists = async (uid) => {
    var url = '/checkSharedScheduleData/' + uid
    const res = await fetch(url)
    if(res.status === 200) //user database exists
    {
      console.log('Shared scheduler data to user.')
      return true
    }
    else
    {
      return false
    }
  }

  //fetch from user database courses
  const fetchUserMandadtoryCourses = async (uid) => {
    var url = '/mandatoryCourses/' + uid 
    const res = await fetch(url)
    const data = await res.json()
    console.log("user mandatory courses: ", data.mandatoryCourses)
    setMandatoryCourses(data.mandatoryCourses)
  }
  const fetchUserElectiveCourses = async (uid) => {
    var url = '/electiveCourses/' + uid 
    const res = await fetch(url)
    const data = await res.json()
    console.log("user elective courses: ", data.electiveCourses)
    setElectiveCourses(data.electiveCourses)
  }
  const fetchSharedSchedulers = async (uid) => {
    var url = '/sharedSchedulersData/' + uid 
    const schedulersDataRes = await fetch(url)
    const schedulersData = await schedulersDataRes.json()
    console.log("shared schedulers2: ", Object.values(schedulersData))
    setSharedSchedulersData(Object.values(schedulersData))
  }

  //fetch from newsletter database courses
  const fetchMCourses = async () => {
    const url = '/mandatoryCourses'
    const res = await fetch(url)
    const data = await res.json()
    // init: adding needed fields to each object
    const result = data.mandatoryCourses.map((v, index) => ({...v,
        done: false,
        id: index,
		    courseType: 'Mandatory'
    }));
    console.log("Mandatory Courses: ", result)
    setMandatoryCourses(result)
    return result
  }

  const fetchECourses = async () => {
    var url = '/electiveCourses'
    const res = await fetch(url)
    const data = await res.json()
    //adding needed fields to each object
    const result = data.electiveCourses.map((v, index) => ({...v,
        done: false,
        id: index,
		    courseType: 'Elective'
    }));
    console.log("Elective Courses: ", result)
    setElectiveCourses(result)
  }

  const updateUserDatabase = async () => {
    const url = '/updateUserDatabase/' + user.uid
    axios({
      method: 'post',
      url: url,
      data: {
        mandatoryCourses: {mandatoryCourses},
        electiveCourses: {electiveCourses}
      }
    });
  }
  /*
  const handleFileSubmit = async (formYear, formSemester) => {
    //e.preventDefault()
    year = formYear
    semester = formSemester
    var mandatoryCourses_ = await fetchMCourses()
    await fetchECourses()
    defaultCheckDoneCourses(mandatoryCourses_)
    setShowKey('select')
  }
  */

  const onLogin = async (userFromLogin) => {
    const uid = userFromLogin.uid
    setUser(userFromLogin)

    /*
    const userHaveCourses = await checkUserCoursesExists(uid)
    const userHaveSchedulerData_ = await checkUserSchedulerDataExists(uid)
    const userHaveSharedSchedulersData_ = await checkSharedSchedulersDataExists(uid)
    if(userHaveSharedSchedulersData_)
      await fetchSharedSchedulers(uid)
    if(userHaveSchedulerData_ && userHaveCourses)
    {
      await fetchUserMandadtoryCourses(uid)
      await fetchUserElectiveCourses(uid)
    }
    else if(userHaveCourses)
    {
      await fetchUserMandadtoryCourses(uid)
      await fetchUserElectiveCourses(uid)
    }
    */
  }

  const onLogout = () => {
    console.log("LOGOUT")
    setUser(null)
  }

  const onPredictFormSumbit = async (dataToPredict) => {
    console.log(dataToPredict)
    //predictFeatures(dataToPredict)
    //send to 
  }

  const onPredictFileSubmit = (dataToPredict) => {
    console.log(dataToPredict)
  }

  const onFileSubmit = async (data) => {
    setModelId(data['file_id'])
    setFeatures(data['features'])
    setAccuracy(data['report']['accuracy'])

    //set confusion matrix and f1 scores
    /*
    for (let key in data)
    {
      console.log(typeof data[key])
      if(typeof data[key] === Object)
        for (let innerKey in data[key])
          console.log(data[key][innerKey])
      else
        console.log(key + ": " + data[key])
    }
    */
  }

  const handleSwitch = (SwitchTextString) => {
    setClassifyingType(SwitchTextString)
    if(themeColor === firstColor)
      setThemeColor(secondColor)
    else
      setThemeColor(firstColor)
    console.log(SwitchTextString)
  }

  const startRef = useRef(null)
  const executeUploadScroll = () => scrollToRef(startRef)

  const testButtonClick = async () => {
    const url = 'models-data/1'

    const res = await axios({
      method: 'get',
      url: url
    });
    console.log(res.data)
  }

  return ( 
    <div style={{fontFamily: 'Calibri'}}>
      <Container sx={{width: "90%"}}>
        <AppBar
          user={user} 
          handleLogin={onLogin} 
          handleLogout={onLogout}
          handleStartClick={executeUploadScroll}
        />
        <br/><br/><br/><br/><br/>
        <About user={user}/>
        <button onClick={testButtonClick}>Press</button>

      </Container>

        <div className="waves" role="presentation"></div>
        <div className="content-bottom" ref={startRef} style={{color: themeColor}}>


          <AppStepper
            firstStepComponent={
              <HandleFile 
                uid={uid}
                onFileSubmit={onFileSubmit}
                handleSwitch={handleSwitch}
                classifyingType={classifyingType}
                themeColor={themeColor}
                firstColor={firstColor}
                secondColor={secondColor}
                TextString={TextString}
                FeaturesString={FeaturesString}
              />}
            secondStepComponent={
              <ScoresAndStats 
                accuracy={accuracy}
              />}
            thirdStepComponent={
              <HandleDataToPredict 
                uid={uid}
                classifyingType={classifyingType}
                features={features}
                onPredictFormSumbit={onPredictFormSumbit}
                onPredictFileSubmit={onPredictFileSubmit}
                modelId={modelId}
              />}
          />
          <div style={{ height: 300 }} />
        </div>
    </div>
  );
}

const appStyle = 
{
  backgroundColor: '#444',
  color: 'white',
	direction: 'rtl',
	TextStringAlign: 'right',
}

export default App;