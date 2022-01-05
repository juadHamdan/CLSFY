import React, { useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import Button from '@mui/material/Button';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

const inputText = 'Supports: xls, xlsx, xlsm, xlsb, odf, ods, odt'

const UploadFile = ({url, onSubmit, successMessage, awaitMessage}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState(inputText);
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false)


  const uploadStyle = {
    fontFamily: 'Calibri',
    fontSize:'1rem'
  };


  const onChange = e => {
    const file = e.target.files[0]
    const fileName = e.target.files[0].name
    setFile(file);
    setFilename(fileName);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setShowSpinner(true)

    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });
      setTimeout(() => setUploadPercentage(0),3000);
      setTimeout(() => setMessage(''), 3000);


      setMessage(successMessage)
      setMessageVariant('success')
      console.log(res.data)
      setShowSpinner(false)
      onSubmit(res.data) //to outside scope
    } 
    catch (err) 
    {
      if (err.response.status === 500)
      {
        setMessage(err.response.statusText)
        setMessageVariant('danger')
      }
      else if (err.response.status === 400)
      {
        setMessage(err.response.statusText + " Only Excel file allowed.")
        setMessageVariant('warning')
      }
      else if (err.response.status === 409)
      {
        console.log(err.response.data)
        setMessage(err.response.statusText + " Model of file name already exists")
        setMessageVariant('warning')
      }
      else 
      {
        setMessage(err.response.statusText);
        setMessageVariant('info')
      }
      setUploadPercentage(0)
    }
  };

  return (
    <>
        <div className='mx-auto' style={uploadStyle}>
            {message ? 
            <Alert variant={messageVariant}>
              {message} {showSpinner?<CircularProgress size="10" color="warning"/>:null}
            </Alert>
             : null}
            {uploadPercentage === 100 ? <Alert variant='secondary' >{awaitMessage}</Alert> : null}

            <form onSubmit={onSubmit} style={{textAlign:'center'}} >
            <div className='custom-file'>
                <input
                  type='file'
                  color='black'
                  className='custom-file-input'
                  size="lg"
                  id='customFile'
                  onChange={onChange}
                />
                <label style={{borderRadius: '1.5rem', borderColor: "inherit", color: "inherit", backgroundColor: "inherit"}} className='custom-file-label' htmlFor='customFile'>
                  {filename} <FindInPageRoundedIcon/>
                </label>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress color="inherit" variant="determinate" value={uploadPercentage} />
              </Box>
              <Box sx={{ minWidth: 35 , }}>
                <Typography ><strong>{`${uploadPercentage}%`}</strong></Typography>
              </Box>
            </Box>

              <Button
                onClick={handleSubmit}
                size="small"
                color="inherit"
              >
                <UploadRoundedIcon/>
                <strong>Upload</strong>
                <UploadRoundedIcon/>
              </Button>
            
            </form>
        </div>
    </>
  );
};

export default UploadFile;