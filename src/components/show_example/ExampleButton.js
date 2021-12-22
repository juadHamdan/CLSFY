import React from 'react'
import AppTableModal from '../show_example/AppTableModal'
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const ExampleButton = ({tableTitle, tableFeatures, tableItems}) => {
    const [showModalTable, setShowModalTable] = React.useState(false)
    return (
        <>
            <Fab 
                style={{color: "inherit", backgroundColor: "inherit"}}
                onClick={() => setShowModalTable(true)}
                size="small" 
                variant="extended" 
                color="inherit">
            <InfoRoundedIcon sx={{ mr: 1 }} />
            Show Example
            </Fab>

            <AppTableModal 
                show={showModalTable}
                onHide={() => setShowModalTable(false)} 
                title={tableTitle}
                features={tableFeatures} 
                items={tableItems}
            />
        </>
    )
}

export default ExampleButton
