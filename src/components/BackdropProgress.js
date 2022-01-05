import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropProgress = ({show, text}) => {
    return (
        <div style={{textAlign: 'center'}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={show}
            >
                <CircularProgress color="inherit" />
                <hr/>
                {text}
            </Backdrop>
      </div>
    )
}

export default BackdropProgress